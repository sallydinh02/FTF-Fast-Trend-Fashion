const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const CustomerModel = require("./model/Customer")
const port=4000
const path=require("path")
const jwt=require("jsonwebtoken")
const multer=require("multer")
const { createCipheriv } = require("crypto")

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

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'uploads')
    // },
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload=multer({storage: storage});

app.use('/images', express.static('upload/images'))

app.post('/signup', upload.single('tryonPhoto'), async(req, res)=>{
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
        tryonPhoto: req.body.tryonPhoto,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        cardNumber: req.body.cardNumber,
        cartData: cart, 
    })

    await customer.save();

    const data={
        customer:{
            id: customer.id
        }
    }

    const token=jwt.sign(data, 'secret_ecom');
    res.json({success: true, token: token, resBody: req.body})
    // res.json({
    //     success: true,
    //     image_url: `http://localhost:${port}/images/${req.file.filename}`
    // })
})

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(403).json({success: false, error: 'No token found' });
    }
  
    // jwt.verify(token.replace('Bearer ', ''), SECRET_KEY, (err, decoded) => {
    //   if (err) {
    //     return res.status(401).json({ message: 'Token is invalid' });
    //   }
    //   req.user = decoded; // Set user information in request object for further use
    //   next();
    // });
    try {
        // Verify token
        const decoded = jwt.verify(token, 'secret_ecom');
    
        // Add user from payload to request object

        req.user = decoded;
    
        next();
      } catch (err) {
        res.status(401).json({success: false, error: 'Invalid token' });
      }
  }

// app.put('/signup-info/:id', async(req, res)=>{
//     //const token=await localStorage.getItem('token');
//     try {
//         //const { address, phoneNumber, cardNumber} = req.body;
        
//         // const {customerId} = req.params;
//         // const customer = await CustomerModel.findById(req.params.id);
//         // if (customer) {
//         //     const updateCustomer=await CustomerModel.findByIdAndUpdate(
//         //         customerId,
//         //         {address, phoneNumber, cardNumber},
//         //         {new: true},
//         //     );
//         //     res.status(200).json(updateCustomer);
//         // }
//         // else {
//         //     return res.status(404).json({success: false, message: 'User not found' });
//         // }
//         // customer.address = address;
//         // customer.phoneNumber = phoneNumber;
//         // customer.cardNumber=cardNumber;
//         // await customer.save();
//         // res.json({success: true, message: 'Profile updated successfully' });
//         const {customerId}=req.params;
//         //const { address, phoneNumber, cardNumber} = req.body;
//         const customer=await CustomerModel.findByIdAndUpdate(customerId,
//             // address:address,
//             // phoneNumber:phoneNumber,
//             // cardNumber: cardNumber
//             req.body
//         );
//         if (!customer){
//             return res.status(404).json({success: false, error: "Customer account doesn't exist"});
//         }
//         const updateCustomer=await CustomerModel.findById(customerId);
//         res.status(200).json(updateCustomer);
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
// })

// app.post("/signup-info", async(req, res)=>{
//     const{email, address, phoneNumber, cardNumber}=req.body;
//     try{
//         await CustomerModel.updateOne({email: email},{
//             $set:{
//                 address: address,
//                 phoneNumber: phoneNumber,
//                 cardNumber: cardNumber
//             }
//         })
//         return res.json({success: true, data: "updated"})
//     }
//     catch(error){
//         return res.json({success: false, data: error})
//     }
// })


app.listen(port, (error) => {
    if (!error){
        console.log("server is running")
    }
    else{
        console.log("Error: "+error)
    }
})