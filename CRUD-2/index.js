const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user'); // Ensure correct import

app.set('view engine', 'ejs');
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    console.log(users)
    res.render('read', { users });
});

app.get('/delete/:id', async (req, res) => {
 let deletedUser= await userModel.findOneAndDelete({_id:req.params.id})
 res.redirect('/read')
})

app.post('/create', async (req, res) => {
    try {
        let { name, email, image } = req.body; // Fix: use 'image' to match form input name
        let createdUser = await userModel.create({
            name,
            email,
            image  // Fix: Match 'img' field in the schema
        });

        res.redirect('/read');
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
