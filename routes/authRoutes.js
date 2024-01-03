const express = require('express')
const usermodel= require('../models/usermodel')
const { hashpassword } = require('../helpers/authHelper')


 const router= express.Router()
 
//register routes

router.post('./register', async(req,res) => {
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


module.exports = router;