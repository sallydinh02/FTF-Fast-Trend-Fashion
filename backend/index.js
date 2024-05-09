const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const CustomerModel = require("./model/Customer")
const port=4000
const path=require("path")
const jwt=require("jsonwebtoken")
const multer=require("multer")
const { createCipheriv } = require("crypto")
const ProductModel=require("./model/Product")

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
            // const data={
            //     customer:{
            //         _id: customer._id
            //     }
            // }
            const data={
                customerID: customer._id
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true, _id: customer._id, token: token});
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
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }

    // destination: (req, file, cb) => {
    //     cb(null, 'uploads/images')
    // },
    // filename: (req, file, cb) => {
    //     cb(null, file.fieldname + '-' + Date.now())
    // }
});

const upload=multer({storage: storage});

app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('tryonPhoto'), (req,res)=>{
    res.json({
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

app.use('/productImages', express.static('upload/productImages'))

app.post('/uploadProductImg', upload.single('productImg'), (req,res)=>{
    res.json({
        success: true,
        image_url: `http://localhost:${port}/productImages/${req.file.filename}`
    })
})

app.post('/addproduct', async(req, res)=>{
    const product=new ProductModel({
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        type: req.body.type,
        image: req.body.image,
        image02: req.body.image02,
        image03: req.body.image03,
        image04: req.body.image04,
        price: req.body.price,
        slug: req.body.slug,
    });
    console.log(product);
    await product.save();
    console.log("Saved")
    res.json({
        success:true,
        name:req.body.name,
        id:req.body.id,
        slug:req.body.slug,
        image: req.body.image,
        image02:req.body.image02
    })
})

app.post('/removeproduct', async(req, res)=>{
    await ProductModel.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
        slug:req.body.slug,
        image: req.body.image,
        image02:req.body.image02
    })
})

app.get('/allproducts', async(req, res)=>{
    let products=await ProductModel.find({});
    console.log("All products Fetched");
    res.send(products);
})

app.get('/allproducts/:id', async(req, res)=>{
    try{
        const product=await ProductModel.findOne({id: req.params.id});
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
});

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
        _id:new mongoose.Types.ObjectId(),
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

    // const data={
    //     customer:{
    //         _id: customer._id
    //     }
    // }
    const data={
        customerID: customer._id
    }

    const token=jwt.sign(data, 'secret_ecom');
    res.json({success: true, _id: customer._id, token: token, resBody: req.body})
    // res.json({
    //     success: true,
    //     image_url: `http://localhost:${port}/images/${req.file.filename}`
    // })
})

const checkAuth=(req, res, next)=>{
    const token=req.headers['auth-token']
    // if (token)
    // {
        // try {
        //     token = req.headers.authorization.split(" ")[1];
        //     console.log(token);
        //     //decodes token id
        //     const decoded = jwt.verify(token, 'secret_ecom');
        //     req.customerID=decoded;
        //     next();
        //   } catch (error) {
        //     res.status(401);
        //     throw new Error("Not authorized, token failed");
        //     //throw new Error("Not authorized, token failed");
        //   }
    //}
    if (!token) {
        res.status(401).send("Invalid token");
      }
    else
    {
        try{
            const data=jwt.verify(token, 'secret_ecom');
            req.customerID=data.customerID;
            next();
        }catch(error){
            res.status(401).send("Please authenticate using a valid token")
        }
    }
    } 

// app.get("/getUserInfo/:userid",checkAuth, async(req,res,next)
app.get("/getCustomerInfo/:userid", async(req,res, next)=>{
    // if(localStorage.getItem('auth-token'))
    // {

    // }
    const customer=await CustomerModel.findById({_id: req.params.userid})
    if (customer){
        customerID=customer._id
        tryonPhoto=customer.tryonPhoto
        res.json({success: true, customerID: customerID, tryonPhoto: tryonPhoto})
    }
    else{
        return res.json({success: false, error: "Can't get customer data"})
    }
    // returnValue=req.customerID;
    // res.json({customerID: returnValue});
}
);

// function verifyToken(req, res, next) {
//     const token = req.header('Authorization');
//     if (!token) {
//       return res.status(403).json({success: false, error: 'No token found' });
//     }
  
//     // jwt.verify(token.replace('Bearer ', ''), SECRET_KEY, (err, decoded) => {
//     //   if (err) {
//     //     return res.status(401).json({ message: 'Token is invalid' });
//     //   }
//     //   req.user = decoded; // Set user information in request object for further use
//     //   next();
//     // });
//     try {
//         // Verify token
//         const decoded = jwt.verify(token, 'secret_ecom');
    
//         // Add user from payload to request object

//         req.user = decoded;
    
//         next();
//       } catch (err) {
//         res.status(401).json({success: false, error: 'Invalid token' });
//       }
//   }

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