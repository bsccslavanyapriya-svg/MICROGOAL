const mongoose = require("mongoose");
const userschema = require("../schema/user");

// Define the model as a function, not a 'new' instance
const usermodel = mongoose.model("User", userschema); 

module.exports = usermodel;