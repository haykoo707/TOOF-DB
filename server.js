const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://toof:723968ar@cluster0.53a3cka.mongodb.net/TOOF?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  username: String,
  score: Number,
  wallet: String
});

const User = mongoose.model("User", UserSchema);

// API for saving/updating user data
app.post("/saveUser", async (req, res) => {
  const { username, score, wallet } = req.body;
  await User.findOneAndUpdate(
    { username },
    { score, wallet },
    { upsert: true, new: true }
  );
  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));
