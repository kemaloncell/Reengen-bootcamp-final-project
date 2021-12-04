const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys").SECRET_KEY;
const User = require("../../models/User");
/*
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */

router.post("/register", (req, res) => {
  let { name, email, password, confirm_password, role } = req.body;
  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Password do not match.",
    });
  }

  // Check for the unique Email
  User.findOne({ email: email }).then((email) => {
    if (email) {
      return res.status(400).json({
        msg: "Email is already registred. Did you forgot your password.",
      });
    }
  });

  // The data is valid and new register the user
  let newUser = new User({
    name,
    email,
    password,
    role,
  });

  // Hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        return res.status(201).json({
          success: true,
          msg: "Hurry! User is now registered.",
        });
      });
    });
  });
});

/*
 * @route POST api/users/login
 * @desc Signing the user
 * @access Public
 */

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(400).json({
        msg: "useranme is not found",
        success: false,
      });
    }
    // If there is user we are now going to compare the password
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // User's password is correct and we need the JSON Token for that user
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
        jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
          res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            msg: "Hurry! you are now logged in",
          });
        });
      } else {
        return res.status(404).json({
          msg: "Incorrect password",
          success: false,
        });
      }
    });
  });
});
module.exports = router;
