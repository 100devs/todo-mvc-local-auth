const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    unique: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);