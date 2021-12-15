const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["Admin", "Editor"],
    },
  },
});

module.exports = User = mongoose.model("users", userSchema);
