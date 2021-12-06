const express = require("express");
const { check, validationResult } = require("express-validator");
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

router.post(
  "/register",
  [
    check("name", "Name is not valid").not().isEmpty().isString().isLength({
      min: 8,
    }),
    check("email", "email is not valid").isEmail(),
    check("password", "Password is not valid, it must be min 8 length and one capital letter").isLength({
      min: 8,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
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
  }
);

/*
 * @route POST api/users/login
 * @desc Signing the user
 * @access Public
 */

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        msg: "Email is not found",
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
            user: user,
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
