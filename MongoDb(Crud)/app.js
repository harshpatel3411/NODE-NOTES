
// HERE I HAVE ADDED MORE QUERIES THAN VIDEO SO DONT GET CONFUSED

const express = require('express')

const usermodel = require('./usermodel');
const { mongo } = require('mongoose')

let app = express()

// Home route
app.get('/', (req, res) => {
    res.send("Welcome Harsh Patel")
})

// Create a new user document
app.get('/create', async (req, res) => {
    let createdUser = await usermodel.create({
        name: "Harsh",
        email: "Harsh@123",
        age: 21,
    })

    //it is async code 
    //Note:- whatever mongodb code you write will be async means , it gets executed after the lines you write after this async
    //if you want that this async code executed first then use async and await

    console.log(createdUser)
    res.send(createdUser)
})

// Read all user documents
app.get('/read', async (req, res) => {
    const allusers = await usermodel.find()//find always gives an array
    res.send(allusers)
})

// Read the first user that matches the name
app.get('/readone', async (req, res) => {
    const oneuser = await usermodel.findOne({ name: 'tisha' })//FindOne gives an object,and if no user exits then it gives empty page,if multple users exits with same name then it will give first person
    res.send(oneuser)
})

// Read all users that match the name
app.get('/readall', async (req, res) => {
    const readAllusers = await usermodel.find({ name: 'Harsh' })//find gives array ,and if no user exits then it gives empty array,if multple users exits with same name then it will give all those person
    res.send(readAllusers)
})

// Update one user (by email), return updated document
app.get('/update', async (req, res) => {
 // syntax->   userModel.findOneAndUpdate(filter,update,{new:true})
    const newname = await usermodel.findOneAndUpdate(
        { email: 'dhrupal@123' },
        { name: 'dhrupal prakashpatel' },
        { new: true } // return the updated document
    )
    res.send(newname)
})

// Delete one user by name
app.get('/delete', async (req, res) => {
    const deletedUser = await usermodel.findOneAndDelete({ name: 'dhrupal prakashpatel' })
    res.send(deletedUser)
})

// Delete all users with age = 21
app.get('/deleteAll', async (req, res) => {
    const alldelteduser = await usermodel.deleteMany({ age: 21 })
    res.send(alldelteduser)
})

// Update all users with name = 'dhrupal', set age to 30
app.get('/updateall', async (req, res) => {
    const result = await usermodel.updateMany(
        { name: 'dhrupal' },
        { $set: { age: 30 } }
    );
    res.send(result)
})

// Find a user by ID
app.get('/findById', async (req, res) => {
    const iduser = await usermodel.findById('682a12027d9b217809297c85');
    res.send(iduser)
})

// Find user by ID and delete
app.get('/findByIdAndDelete', async (req, res) => {
    const idDeleteUser = await usermodel.findByIdAndDelete('682a12027d9b217809297c85');
    res.send(idDeleteUser)
})

// Find user by ID and update name
app.get('/findByIdAndUpdate', async (req, res) => {
    const idupdatedUser = await usermodel.findByIdAndUpdate(
        '682a12098ac7d4f0cf3cd9b8',
        { name: "dhrupal p patel" }
    );
    res.send(idupdatedUser)
})

// Count number of documents that match filter
app.get('/countDocuments', async (req, res) => {
    const countDocuments = await usermodel.countDocuments({ email: 'Harsh@123' })

    // Send as string to avoid Express treating it as status code
    res.send(countDocuments.toString())

    // OR better:
    // res.json({ count: countDocuments });
/* 
* Notes

* countDocuments:
  - `countDocuments()` is a Mongoose method used to count the number of documents 
    in a collection that match a specified filter/query.

* Syntax:
  - Model.countDocuments(filter, callback)

* Important:
  - The result of countDocuments is a **number** (e.g., 0, 1, 5, etc.).
  - When you do `res.send(number)`, Express tries to treat that number as an HTTP status code.
    Some numbers (like 0 or 1) are not valid status codes, which can cause unexpected errors.

* Solution:
  - To avoid this, always send the number wrapped in a string or as part of an object:
    → res.send(count.toString())
    → OR
    → res.json({ count: countDocuments });
*/


})

// Sort users by age in descending order (largest age first)
app.get('/sort', async (req, res) => {
    const usersSortedByAge = await usermodel.find().sort({ age: -1 });
    // 1 = ascending, -1 = descending
    res.send(usersSortedByAge)
})

// Limit results to first 3 users
app.get('/limit', async (req, res) => {
    const limitedUser = await usermodel.find().limit(3)
    res.send(limitedUser)
})

// Skip the first 2 users and return the rest
app.get('/skip', async (req, res) => {
    const skippeduser = await usermodel.find().skip(2)
    res.send(skippeduser)
})

// Pagination: show page 2 with 2 users per page, sorted by newest (_id)
app.get('/users', async (req, res) => {
    const page = 2;
    const size = 2;
    const users = await usermodel.find()
        .sort({ _id: -1 }) // newest first
        .skip((page - 1) * size) // skip first page
        .limit(2); // return 2 users
    res.json(users);
})

// Start the server
app.listen(3000, (req, res) => {
    console.log("App is listening on the port 3000")
})

/*
    Covered:
    1. CRUD operations
    2. findById, findByIdAndUpdate, findByIdAndDelete
    3. countDocuments
    4. sort, limit, skip (used for pagination)
*/
