const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: String,
  url: String,
  userId: String
});

module.exports = mongoose.model("songs", SongSchema);