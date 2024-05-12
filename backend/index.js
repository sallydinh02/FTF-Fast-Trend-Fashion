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
app.use(cors({
    credentials: true
}));

mongoose.connect("mongodb+srv://sallymyky02:sally139@cluster0.lencr1d.mongodb.net/ecommerce");

app.get("/", (req, res)=>{
    res.send("Express app is running")
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});

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
});

const upload=multer({storage: storage});

app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('tryonPhoto'), (req,res)=>{
    res.json({
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

app.post('/uploadProductImg', upload.single('productImg'), (req,res)=>{
    res.json({
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
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

app.get('/allproducts/:slug', async(req, res)=>{
    try{
        const product=await ProductModel.findOne({slug: req.params.slug});
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
})

const checkAuth=(req, res, next)=>{
    const token=req.headers['auth-token']
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

app.get("/getCustomerInfo/:userid", async(req,res, next)=>{
    const customer=await CustomerModel.findById({_id: req.params.userid})
    if (customer){
        customerID=customer._id
        tryonPhoto=customer.tryonPhoto
        res.json({success: true, customerID: customerID, tryonPhoto: tryonPhoto})
    }
    else{
        return res.json({success: false, error: "Can't get customer data"})
    }
}
);