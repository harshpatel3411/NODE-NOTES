const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        console.log(files);//[](if nothing in files folder)
        res.render('index', { files: files });
        //{files:files} <= it is used to send to data to ejs files
    })
});

app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function (err, filedata) {
 
      res.render('show',{filename:req.params.filename,filedata:filedata})
    })
    // utf-8 if used to read file in english,
    //  if you will not write utf-8  then file will come in the form of buffer(<Buffer 4b 45 4d 20 43 48 4f>)
})

app.post('/create', function (req, res) {
    console.log(req.body)
    // console.log("i am running", req.body.title)

    // Syntax of fs.writeFile():-> fs.writeFile(file, data, callback)
    // file:-File path where data will be written.
    //data:-The content to write into the file.
    //callback:-A function that runs after writing is complete, taking err as an argument.

    fs.writeFile(`./files/${req.body.title.split(" ").join("-")}.txt`, req.body.details, function (err) {
        res.redirect('/')

    })
})

app.get('/edit/:filename', (req, res) => {
    console.log("File Name Is:-",req.params.filename)
    res.render('edit',{filename:req.params.filename})
   
})//to edit 

app.post('/edit',function(req,res) {
    fs.rename(`./files/${req.body. previous}`,`./files/${req.body.new}`,function (err) {
        console.log(req.body.previous)
        res.redirect('/');
    })
})//to edit filename

app.listen(port, function () {
    console.log(`App running on port ${port}`);
});

