const mongoose = require("mongoose");

const MemorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String, // image URL
  date: Date,
}, { timestamps: true });

module.exports = mongoose.model("Memory", MemorySchema);
