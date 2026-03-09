const cookieParser = require("cookie-parser");
const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');


const app=express()

app.use(cookieParser())//to get hidden cookies

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
            //it will be long string and stored into databases
            //harsh123 is convertend into ("$2b$10$67srgiVugS6ITNOHU95k9O.VMbTv9ns66syfUdTC.8a6jgXqZYO42y")
           
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


//jwt is a token that server sends to brower , hence jyare browser mathi biji request avse tyare aa token te request ni jode
//server jode jase and server farithi nai puche ke "Tum kon Ho !!"

app.get('/jwt',function(req,res){
 let token =   jwt.sign({email:"harsh@example.com"},"secret key")

 //based on this secret key i can decrypt email data
 res.cookie("token",token)
 res.send('done')
 console.log(token);

//     ✅ The email is encoded inside the token, sent to the browser.

// ✅ The browser sees only the encoded token, not the real email.

// ✅ Only the server with the correct secret key can decode (verify) it.

    //here first thing like email will be always unique,
    //second paramer must be private , now should be aware of it like your insta password 
})

app.get('/readjwt',(req,res)=>{
    console.log("Here is token:-",req.cookies.token)

let data =    jwt.verify(req.cookies.token,"secret key")//to decrypt the data
console.log(data)
res.send('reading jwt ')
})
app.listen(3000,()=>{
    console.log("app is runnig on port 3000")
})