const mongoose = require('mongoose')
const colors = require('colors')
const db=process.env.Mongodb_URL

mongoose.set('strictQuery',false);

mongoose.connect(db).then(()=>{
    console.log('Database connected'.bgMagenta.white)
})