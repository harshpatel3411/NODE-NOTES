
const express = require('express');
const { body, validationResult } = require('express-validator');

let app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs")


app.get('/',(req,res)=>{
    res.render('index')
})

// 1. Route validation (manual)
app.post('/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(errors.isEmpty())

    // ❌ If validation errors, return 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Simulate user creation (can throw error)
    try {
      const { username, email, password } = req.body;
      // Save to DB (pretend)
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
      next(err); // Pass error to error handling middleware
    }
  }
);




// Global Error handler middleware (last one)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});




app.listen(3000,()=>{
    console.log("app is listeing on the port 3000")
})


