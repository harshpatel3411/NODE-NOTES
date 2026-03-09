const mongoose = require('mongoose');


mongoose.connect(`mongodb://127.0.0.1:27017/mongopractise`);


let userSchema=mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    
})//Schema means which properties you want to give to user
//schema defines how data should be organised



module.exports=mongoose.model("user",userSchema)

// without model we cant perform insert,update,delete,etc... , Hence we create model

//here we export model because we want to perform this operation on perticular route hence we export it
// for Example- on "/create" - create something , On "/delete" - we delete something
