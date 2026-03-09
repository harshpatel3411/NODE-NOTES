const cookieParser = require("cookie-parser");
const express=require("express");
const bcrypt=require("bcrypt")

const app=express()

app.use(cookieParser())//to get cookies

app.get('/',function(req,res){
    res.cookie('name','dhrupal');//to set cookie(use res to set cookies)
    res.send('done');
})

// app.get('/password',function(req,res){
//     bcrypt.genselt(saltRounds,function(err,salt){
//         bcrypt.hash(myPlaintextPassword,salt,function(err,hash){

//         })
//     })
// })  //syntax to use bcrypt


app.get('/password',function(req,res){
    bcrypt.genSalt(10,function(err,salt){
        console.log("Random String is :-",salt)//salt is a random string("$2b$10$67srgiVugS6ITNOHU95k9O")
        bcrypt.hash("harsh123",salt,function(err,hash){
            console.log("Random String is:",hash)
            //harsh123 is convertend into ("$2b$10$67srgiVugS6ITNOHU95k9O.VMbTv9ns66syfUdTC.8a6jgXqZYO42y")
            //this string will be saved into database
        })
       
    })
}) // How to do encryption


// app.get('/checkpassword',function(req,res){
//     bcrypt.compare("myPlaintextPassword","hash",function(err,result))
// })//syntax to do decryption(comparision)

app.get('/checkpassword',function(req,res){
    bcrypt.compare("harsh123","$2b$10$klkqB7ujoZjYwhwflfntcu59k7zYSSEMcjZjuNWoRVRC07lPpwq/m",function(err,result){
        console.log(result)//to check both string is matching or not
    })
})

app.get('/read',function(req,res){

    //now on every route my cookies are attached 

   console.log(req.cookies);//try to read cookie(use req to read cookies)
    res.send('read page');
})
app.listen(3000,()=>{
    console.log("app is runnig on port 3000")
})