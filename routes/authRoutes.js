const express = require('express')
const usermodel= require('../models/usermodel')
const { hashpassword, compare } = require('../helpers/authHelper')
const JWT = require('jsonwebtoken')

 const router= express.Router()
 
//register routes

router.post('/register', async(req,res) => {
try {
    const{name,email,password,phonenumber,address} = req.body
    if(!name){
        return res.send({error:'name is required'})
    }
    if(!email){
        return res.send({error:'email is required'})
    }
    if(!password){
        return res.send({error:'password is required'})
    }
    if(!phonenumber){
        return res.send({error:'phonenumber is required'})
    }
    if(!address){
        return res.send({error:'address is required'})
    }
    const existingUser = await usermodel.findOne({email})

    if(existingUser){
        res.status(200).send({
            success: true,
            message: 'already exist',
        })
    }
    const hashedpassword = await hashpassword(password)

    const user = await new usermodel({
        name,email,phonenumber,address,password: hashedpassword
    }).save()

    res.status(201).send({
        success: true,
        message: 'successfully registered',
        user
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: 'error in registeration',
        error
    })
    
}
})

//login routes
router.post('/login', async(req,res) =>{
    try {
        const{email, password} = req.body

        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Invalid password and email'
            })
        }
        //check user
        const user = await usermodel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'email is not registered'
            })
        }
        const match = await compare(password, user.password)
        if(!match){
            return res.status(200).send({
                error: false,
                message: 'password incorrect'
            })
        }
        const token = await JWT.sign({ _id: user.id}, process.env.JWT_Secret, {expiresin: "7d"});
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                name: user.name,
                email: user.email,
                phonenumber: user.phonenumber,
                address: user.address,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in login",
            error
        })
    }
})


module.exports = router;