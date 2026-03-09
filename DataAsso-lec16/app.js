const express = require('express');
const usermodel=require('./models/usermodel')
const postmodel=require('./models/posts')

const app=express()


app.get('/',async (req,res)=>{
    
let allusers=await usermodel.find()
console.log(allusers)
    res.send('hey')
})


app.get('/create',async(req,res)=>{
 let user= await  usermodel.create({
        username:"harsh",
        age:20,
        email:"harsh@gmail.com"
    })

    res.send(user)
})

app.get('/post/create',async(req,res)=>{
let post=await postmodel.create({
    postdata:'Hello There',
    user:'682ab92ed790ad4b82a5d167',

})


let user=await usermodel.findOne({_id:'682ab92ed790ad4b82a5d167'})
user.posts.push(post._id);
await user.save();

res.send({post,user})
})



app.listen(3000,(req,res)=>{
console.log("app is listening on port 3000")
})