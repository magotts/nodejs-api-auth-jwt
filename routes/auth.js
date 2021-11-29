const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {registerValidation, loginValidation} = require("../validation");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {

  // LETS VALIDATE THE DATA
 //VALIDATE DATA
 const validation = schema.validate(req.body);
 res.send(validation);

  // CHECK IF USER IS IN THE DB
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send("Email already exist.");
  

  // HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
 
  // CREATE A NEW USER
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({user : user._id});
  } catch (err) {
    res.json({ message: err });
  }
});

// LOGIN 
router.post("/login", async (req, res) => {
  const {error} = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message);

   // CHECK IF EMAIL EXIST
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send("Email is not found.");

  // CHECK IF PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");

  // CREATE AND ASSIGN A TOKEN
  const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token)

  res.send("Logged in.");
})

module.exports = router;
