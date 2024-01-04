const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({ path: './config.env' });
require('./conn/db')
const authRoutes = require('./routes/authRoutes')



const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Welcome To Ecommerce App</h1>");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`.bgCyan.white);
});

