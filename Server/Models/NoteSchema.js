const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "You need to have title to your note"]
  },
  content: {
    type: String,
    required: [true, "Note needs to have some content"]
  }
});

module.exports = mongoose.model("Note", noteSchema);
