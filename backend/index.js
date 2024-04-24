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

app.post('/login', async(req, res)=>{
    let customer=await CustomerModel.findOne({email:req.body.email});
    if (customer){
        // true if same password as in database
        const passCompare=req.body.password === customer.password;
        if (passCompare){
            const data={
                customer:{
                    id: customer.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false, error: "Wrong password"});
        }
    }
    else{
        res.json({success:false, error: "Wrong email address"});
    }
})

app.post('/signup', async(req, res)=>{
    let check=await CustomerModel.findOne({email: req.body.email});
    if (check){
        return res.status(400).json({success: false, error: "existing user found with same email address"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const customer=new CustomerModel({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData: cart, 
    })

    await customer.save();

    const data={
        customer:{
            id: customer.id
        }
    }

    const token=jwt.sign(data, 'secret_ecom');
    res.json({success: true, token})
})


app.listen(port, (error) => {
    if (!error){
        console.log("server is running")
    }
    else{
        console.log("Error: "+error)
    }
})