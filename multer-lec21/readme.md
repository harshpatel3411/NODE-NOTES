What to do

1.users post likh paayege
2.login and register
3.logout
4.post creation
5.post like
6.post delete




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./public/images/uploads'.trim())
        //note:->./public/images/uploads (dont give space after and before path) or else use trim method to cut that spaces
    },//gives destination of folder where we will upload the files
    filename: function (req, file, cb) {
        
        crypto.randomBytes(12, (err, bytes) => {
            // console.log(bytes)//gives buffer value ,must convert into hexa desimal
            // console.log(bytes.toString('hex'))//convert into hexa desimal
            console.log("filename is:-",file)//contains original values of user actual file

            const fn = bytes.toString('hex') + path.extname(file.originalname);
            /* means->random string +  extension name
             path.extname will abstract name of perticular file
             ex-harh.jpeg=>op-jpeg
             ex-tisha.pdf=>op-pdf
             ex-harh.txt=>op-txt*/
            
            //cb(err,fn)<==syntax

            cb(null,fn)//used to set file

            
        })
    }/* it will provide you random name  to avoid cases of overriding if multiple people upload the file with the same name
    ex- if me and my frd upload file named myfile that file will go to image folder but one folder can contain file with same name hence my file will override myfrd file , to avoid this case we use this thing*/
})//describe how to upload files


const upload=multer({storage:storage})