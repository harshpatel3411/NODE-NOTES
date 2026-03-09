const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('index')
})


app.post('/create', (req, res) => {
    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        console.log(salt)
        bcrypt.hash(password, salt, async (err, hash) => {
            console.log(hash);


            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            })
            
            let token = jwt.sign({ email }, 'harsh123');

            res.cookie("token", token)//to send cookie on the browser 


            res.send(createdUser)

        })
    })

})
//note:- bcrypt hamesha different hash create karse for even same password
//ae badha hash mathi tu koi hash match kari sake but plain-text password judo hovo na joia



app.get('/login', (req, res) => {
    res.render('login')
})//just display page to take email and password from user

app.post('/login', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });

    console.log(user)//if user exits in database then it will give that user , else it will give you null

    if (!user) return res.send("SOMETHING WENT WRONG!!");

    console.log("Hash Password Stored in database:-",user.password," ", "plain current passwor:-", req.body.password)

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        console.log(result)
                // if result comes true then i will send token to the user and allow them to login
        if (result) {

            let token = jwt.sign({email: user.email }, 'harsh123');

            res.cookie("token", token)//to send cookie on the browser 

         return res.send("Yes You Can Login");


//NOte:-✅ **Always set headers or cookies before sending the response.**
//  ❗ Use `return` after `res.send()` or `res.json()` to prevent sending multiple responses.


 
        }
        else res.send("Something Went Wrong");

    })//comparing password to check does user entered right or wrong wrong
    //here i will compare two passwords 1.hashed password(stored in database) and 2.password entered by use through by user
})


app.get('/logout', (req, res) => {
    res.cookie("token", "")
    res.redirect('/')
})

app.listen(3000)