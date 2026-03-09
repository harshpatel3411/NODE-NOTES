const express=require('express');
const path=  require('path')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));

// console.log(__dirname);//C:\Users\harsh\Desktop\Backend Basics\Dynamic-Routing
// console.log(__dirname+"/public");//C:\Users\harsh\Desktop\Backend Basics\Dynamic-Routing/public
//static files means css,images


// To set .ejs file
app.set('view engine','ejs')
app.get("/",function(req,res){
    res.render("index")
})
//notes->Summary of app.set('view engine', 'ejs')
//- app.set(key, value) is used to configure Express settings.
// -'view engine' is a fixed setting in Express for specifying the template engine.
// -'ejs' is the value that tells Express to use EJS for rendering views.
//- This allows res.render("index") to automatically find and render index.ejs from the views folder.
//- You can replace 'ejs' with other templating engines like 'pug', 'hbs', etc.


// Dynamic Routes
app.get("/profile/:username",function(req,res){
    req.params.username//to take value of user from url
    res.send(`welcome dear ${req.params.username}`)
})//use colun before the part which you want to make dynamic

app.get("/profile/:username/:age",function(req,res){
  
    res.send(`welcome dear ${req.params.username} your age is ${req.params.age}`)

})//here i set two dynamic routes

app.listen(4000,function(){
    console.log("App is running on port 4000");
    
})



