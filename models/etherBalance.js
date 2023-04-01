const mongoose = require('mongoose');
const balance = new mongoose.Schema({
  balance: Number,
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("myBalance", balance);