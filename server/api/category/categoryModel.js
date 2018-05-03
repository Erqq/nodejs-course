const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model("user", PostSchema);
