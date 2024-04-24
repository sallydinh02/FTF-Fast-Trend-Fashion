const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
   name:{
      type: String,
   },
   email:{
      type: String,
      unique: true,
   },
   password:{
      type: String,
   },
   profile:{
      type: String,
   },
   address:{
      type: String,
   },
   phoneNumber:{
      type: String,
   },
   cardNumber:{
      type: String,
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