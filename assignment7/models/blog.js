const mongoose = require("mongoose");
const Blog = new mongoose.Schema({

    heading:{
        type:String,
        required:true,
    },
    blog:{
        type : String,
        required:true,
       },
    userId:{
        type : String,
        required:true,
    },
});

module.exports=mongoose.model("Blog",Blog,"Blog");