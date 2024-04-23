const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const CustomerModel = require("./model/Customer")
const port=4000
const path=require("path")
const jwt=require("jsonwebtoken")
const multer=require("multer")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://sallymyky02:sally139@cluster0.lencr1d.mongodb.net/ecommerce");

app.get("/", (req, res)=>{
    res.send("Express app is running")
})

// app.post("/login", (req, res) => {
//     const {email, password} = req.body;
//     CustomerModel.findOne({email : email})
//     .then(user => {
//         if(user) {
//             if(user.password === password){
//                 res.json("Success")
//             }else{
//                 res.json("The password is incorrect")
//             }
//         }else{
//             res.json("No record existed")
//         }
//     })
// })

// app.post("/signup", (req, res) => {
//     CustomerModel.create(req.body)
//     .then(customer => res.json(customer))
//     .catch(err => res.json(err))
// })


app.listen(port, (error) => {
    if (!error){
        console.log("server is running")
    }
    else{
        console.log("Error: "+error)
    }
})