const mongoose = require("mongoose");

const costumeSchema = new mongoose.Schema({
  costume_type: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true,
    minlength: 1
  },
  cost: {
    type: Number,
    required: true,
    min: 10,      
    max: 100
  }
});

module.exports = mongoose.model("Costume", costumeSchema);
