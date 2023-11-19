const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = Schema({
  fullName: String,
  email: String,
  phone: String,
  isActive: Boolean,
});

module.exports = mongoose.model("User", userSchema);
