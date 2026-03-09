const express = require('express')
const app = express()
app.use((req, res, next) => {
    console.log("FIRST MIDDLEWARE")
    next()
})

app.use((req, res, next) => {
    console.log("second MIDDLEWARE")
    next()
})

app.get('/error', (req, res, next) => {
    const err = new Error('Something went wrong!');
    console.log(err)
    err.status=500;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err); // Logs the error
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        status:err.status || 500,
        stack:err.stack ,
    });
    
});

app.get('/', (req, res) => {
    res.send("HELLO HARSH")
})

app.get('/profile', (req, res) => {
    res.send('we are on profile route')
})

app.listen(3000)