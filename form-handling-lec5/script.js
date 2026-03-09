const express=require('express')
const app=express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))


//summary of above two lines:-


// 1️⃣ express.urlencoded({ extended: true }) vs express.urlencoded({ extended: false })

//*express.urlencoded() is used to parse URL-encoded form data (data sent from HTML forms).

//1->extended: false → Only supports simple key-value pairs (no nested objects or arrays).
// example:-
// name=John&age=25  →  { name: 'John', age: '25' }
// ❌ user[name]=John&user[age]=25 → { 'user[name]': 'John', 'user[age]': '25' } (not nested).


//2->extended: true → Supports nested objects and arrays.
// example:-
//user[name]=John&user[age]=25  →  { user: { name: 'John', age: '25' } }
// hobbies[]=reading&hobbies[]=coding  →  { hobbies: ['reading', 'coding'] }



// 2️⃣ Why express.json() is used?

// express.json() parses incoming JSON data and makes it available in req.body.

// Use case: When a client (React, Postman, Mobile App) sends JSON data in a request body.

//example:-
// app.use(express.json());

// app.post('/user', (req, res) => {
//     console.log(req.body);  // ✅ { name: 'John', age: 25 }
// });

//🚫 Without express.json(), req.body would be undefined.