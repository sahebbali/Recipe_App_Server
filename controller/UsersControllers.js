const  express =  require("express");
const  jwt =  require("jsonwebtoken");
const  bcrypt =  require("bcrypt");
const   UserModel = require("../models/Users.js");
  
exports.RegisterUser=async (req, res) => {
    const { username, password } = req.body;
    console.log(username,password)
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    // res.json({ message: "User registered successfully" });
    // res.json(newUser);
    res.status(200).json(newUser)
}
exports.LoginUser=async (req, res) => {
    const { username, password } = req.body;
  
    const user = await UserModel.findOne({ username });
  
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
}


  