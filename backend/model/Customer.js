const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
   name:{
      type: String,
      //required: true
   },
   email:{
      type: String,
      //required: true,
      unique: true
   },
   password:{
      type: String,
      //required: true
   },
   tryonPhotos:{
      type: String
      //default: ""
   },
   address:{
      type: String,
      //default: ""
   },
   phoneNumber:{
      type: Number,
      //type: String
      //default: 1
   },
   cardNumber:{
      type: Number,
      //type: String
      //default: 1
   },
   cartData:{
      type:Object,
   },
   date:{
      type:Date,
      default:Date.now,
   }
})

const CustomerModel = mongoose.model("customer", CustomerSchema)

module.exports = CustomerModel