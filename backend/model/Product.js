const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
   id:{
    type: Number,
    required: true,
    unique: true,
   },
   name:{
      type: String,
      required: true
   },
   category:{
      type: String,
      required: true,
   },
   type:{
      type: String,
      required: true
   },
   image:{
      type: String,
      required: true
      //default: ""
   },
   image02:{
    type: String,
    required: true
    //default: ""
 },
    image03:{
    type: String,
    required: true
    //default: ""
},
    image04:{
    type: String,
    required: true
    //default: ""
    },
    price:{
        type: Number,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

const ProductModel = mongoose.model("product", ProductSchema)

module.exports = ProductModel