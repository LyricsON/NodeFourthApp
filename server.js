const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const connectDb = require("./config/connectDb");
const User = require("./model/user");
connectDb();
app.use(express.json());
app.post("/add", async (req, res) => {
  const { fullName, email, phone } = req.body;
  try {
    const newUser = new User({
      fullName,
      email,
      phone,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/get", async (req, res) => {
  try {
    const getUsers = await User.find();
    res.send(getUsers);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/getOne/:id", async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.send(getUser);
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/edit/:id", async (req, res) => {
  try {
    const editUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(editUser);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send("user deleted");
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`server is successfuly runing on PORT ${PORT}`)
);
