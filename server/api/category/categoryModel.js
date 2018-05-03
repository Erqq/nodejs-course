const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
});
module.exports = mongoose.model("category", CategorySchema);
