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
  if (name == "" || email == "" || password == "" || confirm_password == "" || role == "") {
    return res.status(400).json({
      success: false,
      msg: "All blanks must be filled",
    });
  }
  // Check for the name length
  if (name.length <= 8) {
    return res.status(400).json({
      success: false,
      msg: `Must contain a minimum of 8 characters, you entered ${name.length}`,
    });
  }

  // Check for the name type
  if (!isNaN(name) || /\d/.test(name)) {
    return res.status(400).json({
      success: false,
      msg: `Your name must not contain numeric values ${name}`,
    });
  }

  // Check for the password At least eight characters, at least one uppercase letter, one lowercase letter, and one number:
  const filterPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!filterPassword.test(password)) {
    return res.status(400).json({
      success: false,
      msg: "Must contain at least eight characters, at least one capital letter and one number",
    });
  }
  // Check for the password
  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Password do not match.",
    });
  }

  // Check for the email
  const filterEmail = /\S+@\S+\.\S+/;
  if (!filterEmail.test(email)) {
    return res.status(400).json({
      success: false,
      msg: "Email is not valid",
    });
  }
  // Check for the unique Email
  User.findOne({ email: email }).then((email) => {
    if (email) {
      return res.status(400).json({
        msg: "Email is already registred.",
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
  User.findOne({ email: req.body.email }).then((user) => {
    if (req.body.email === "" || req.body.password === "") {
      return res.status(400).json({
        success: false,
        msg: "Email or Password cannot be empty",
      });
    } else if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Email is not found",
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
          remember: user.remember,
          role: user.role,
        };
        //    window.localStorage.setItem("token", token);
        // if (!req.body.remember_me) { return next(); } bodyden sadece chehck işareti gelmeli checked 1 yıl değilse 1 gün olabilir
        // anahtarı kaydet yoksa geç issue a remember me cookie if the option was checked
        /* if (req.body.remember) {
    req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
  } else {
    req.session.cookie.expires = false;
  } */
        console.log(req.body.remember);
        if (req.body.remember) {
          jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
            res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
              user: user,
              msg: "Hurry! you are now logged in",
            });
          });
        } else {
          jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
            res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
              user: user,
              msg: "Hurry! you are now logged in",
            });
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          msg: "Incorrect password",
        });
      }
    });
  });
});

/*
 * @route GET api/users/profile
 * @desc Return the User's Data
 * @access Private
 */

router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
  return res.json({
    user: req.user,
  });
});
module.exports = router;
