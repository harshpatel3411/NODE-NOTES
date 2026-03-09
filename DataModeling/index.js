import express from "express";

const app=express()

let port=3000;

app.get('/',(req,res)=>{
    res.send('hello there')
})

app.listen(port,(req,res)=>{
   console.log('app is running on port ', port)
})