const User = require("../models/user");
const Blog = require("../models/blog");
const mongoose = require("mongoose");

//API for User signup.
exports.signup=(req,res)=>{
    let {firstName,lastName,email,password,dateOfBirth} = req.body;
    let user = new User({
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
    });
    user.save()
    .then(()=>{
        return res.status(200).send(user);
    })
    .catch((error)=>{
        console.error(error);
        return res.status(500).send("Error");
    });
};

//API for User Login.
exports.login=(req,res)=>{
    let {email,password}=req.body;
    User.findOne({email:email})
    .then((user)=>{
        console.log(user);
        console.info(`user with email : ${email} was found successfully`);

        if (password===user.password){
            console.info("login successful");
            return res.status(200).send(user);
        }
        console.warn("password incorrect");
        return res.status(401).send("password incorrect");

    })

    .catch((error)=>{
        console.error(`user with ${email} does not exist`);
        return res.status(404).send(`user with ${email} does not exist`);
    });
};

//API for get User by Email.
exports.getUserByEmail=(req,res)=>{
    let emailParam = req.params.email;
    User.findOne({email:emailParam})
    .then((user) => {
        if (user) {
          console.info("User found");
          return res.status(200).send(user);
        }
        console.error("User was not found!");
        return res.status(404).send("NOT FOUND");
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send("ERROR");
      });
};

//API for get User by _id.
exports.getUserByID=(req,res)=>{
    let id = req.params.id;
    id = mongoose.Types.ObjectId(id);
    User.findOne({_id:id})
    .then((user) => {
        if (user) {
          console.info("User found");
          return res.status(200).send(user);
        }
        console.error("User was not found!");
        return res.status(404).send("NOT FOUND");
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send("ERROR");
      });
};

//API for User to post blog.
exports.postBlog=(req,res)=>{
    let {heading,blog,userId} = req.body;
    let bloging = new Blog({
       heading,
       blog,
       userId,
    });
    bloging.save()
    .then(()=>{
        return res.status(200).send(bloging);
    })
    .catch((error)=>{
        console.error(error);
        return res.status(500).send("Error");
    });
};

//API for User to get blog by userId.
exports.getUserByuserId=(req,res)=>{
    let userIdParam = req.params.userId;
    Blog.findOne({userId:userIdParam})
    .then((blog) => {
        if (blog) {
          console.info("Blog found");
          return res.status(200).send(blog);
        }
        console.error("Blog was not found!");
        return res.status(404).send("NOT FOUND");
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send("ERROR");
      });
};