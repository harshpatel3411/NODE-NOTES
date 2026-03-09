const express = require('express');
const userModel = require('./models/user');
const postmodel = require('./models/post');
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const path = require('path');


const jwt = require('jsonwebtoken');
const multer = require('multer');
const crypto = require('crypto');

const app = express()
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads'.trim())
        //note:->./public/images/uploads (dont give space after and before path) or else use trim method to cut that spaces
    },//gives destination of folder where we will upload the files
    filename: function (req, file, cb) {

        crypto.randomBytes(12, (err, bytes) => {
            // console.log(bytes)//gives buffer value ,must convert into hexa desimal
            // console.log(bytes.toString('hex'))//convert into hexa desimal
            //console.log(file)//contains original values of user actual file

            const fn = bytes.toString('hex') + path.extname(file.originalname);
            /* means->random string +  extension name
             path.extname will abstract name of perticular file
             ex-harh.jpeg=>op-jpeg
             ex-tisha.pdf=>op-pdf
             ex-harh.txt=>op-txt*/

            //cb(err,fn)<==syntax

            cb(null, fn)//used to set file


        })
    }/* it will provide you random name  to avoid cases of overriding if multiple people upload the file with the same name
    ex- if me and my frd upload file named myfile that file will go to image folder but one folder can contain file with same name hence my file will override myfrd file , to avoid this case we use this thing*/
})//describe how to upload files


const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.render("index")
})
app.get('/login', (req, res) => {
    res.render("login")
})

app.get('/profile', isLoggedIn, async (req, res) => {
    // console.log(req.user)

    let user = await userModel.findOne({ email: req.user.email }).populate("posts")
    console.log("here is the user:-", user);

    res.render("profile", { user })
})

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postmodel.findOne({ _id: req.params.id }).populate('user')
    //aa vastu tane post ni details apse but dhyan rakhje ahi me populate use karyu che user mate je post schema no part che atle tane user ni badhi details api dese
    //note : populate check karje kai rite work kare em 

    if (post.likes.indexOf(req.user.userid) === -1) {

        post.likes.push(req.user.userid)//here req.user property is given by isLoggedIn function 

    }
    else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }
    await post.save()
    res.redirect('/profile');
})//to like the post


app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postmodel.findOne({ _id: req.params.id }).populate('user')

    res.render('edit', { post })
})//to edit post


app.post('/update/:id', isLoggedIn, async (req, res) => {
    let post = await postmodel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content })

    res.redirect('/profile')
})//to edit post


app.post('/post', isLoggedIn, async (req, res) => {
    // console.log(req.user)
    let user = await userModel.findOne({ email: req.user.email })

    let { content } = req.body
    let post = await postmodel.create({
        user: user._id,
        content: content
    })

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile')
})


app.post('/register', async (req, res) => {
    let { email, password, username, name, age } = req.body
    let user = await userModel.findOne({ email })
    if (user) {
        return res.status(500).send("user already registered")
    }

    bcrypt.genSalt(10, (err, salt) => {
        console.log(salt)
        bcrypt.hash(password, salt, async (err, hash) => {
            console.log(hash)
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash,
            })
            let token = jwt.sign({ email: email, userid: user._id }, "harsh");

            res.cookie("token", token)
            res.send("registered")

        })
    })


})


app.post('/login', async (req, res) => {
    let { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (!user) {
        return res.status(500).send("Something Went Wrong")
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "harsh");
            res.cookie("token", token)
            //if user email and password both are right then it will redirect you to the profile
            res.status(200).redirect('/profile')
        }
        else {
            res.redirect('/')
        }
    })

})


app.get('/logout', (req, res) => {
    res.cookie('token', "")
    res.redirect('/login')
})


function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") {
        //if user does not exits then it will redirect you to login page
        return res.redirect("/login")

    }
    else {
        let data = jwt.verify(req.cookies.token, "harsh")
        console.log(data)
        req.user = data;
        console.log(req.user);
        next()
    }

}//protected route 


app.get('/upload', (req, res) => {
    res.render('test')
})

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file)
})

app.listen(3000, () => {
    console.log("app is running on port 3000")
})