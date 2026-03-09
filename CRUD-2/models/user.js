const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testapp1")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
  image: String,  // Ensure the field name is 'img'
  email: String,
  name: String,
});

module.exports = mongoose.model('User', userSchema);
