const UserModel = require("../models/user.model");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

let registerController = async (req, res) => {
  try {
    let { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        message: "All Fields Required",
      });
    }

    let isExisted = await UserModel.findOne({ email });

    if (isExisted) {
      return res.status(409).json({
        message: "This email is already registered",
      });
    }

    let hashPass = await bcrypt.hash(password, 10);

    let newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
      mobile,
    });

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(token, "Token hai =-=-=-=-=-=");
    res.cookie("token", token);

    return res.status(201).json({
      message: "USer created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

let loginController = async (req,res) => {
try {
  let {email, password} = req.body; //Recieved Data

  if(!email || !password) {
    return res.status(400).json({
      message:"Email and Password Required"
    })
  }

  let isExisted = await UserModel.findOne({email}); //Check User Exist or not

  if(!isExisted){
    return res.status(400).json({
      message:"User not found"
    })
  }

  // Verify Password
  let comparePass = await bcrypt.compare(password,isExisted.password);
  
  if(!comparePass){
    return res.status(401).json({
      message:"Invalid Credentials"
    })
  }

  //Generate Token
  let token = jwt.sign({ id:isExisted._id}, process.env.JWT_SECRET, {
    expiresIn:"1h"
  });

  //Store Token In Cookie
  res.cookie("id_card",token)

  //Send Response
  return res.status(200).json({
    message:"User Logged In Successfully",
    user:isExisted
  })
  
} catch (error) {
  return res.status(500).json({
    message:"Internal Server Error"
  })
}
}

module.exports = { registerController , loginController};
