const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    ref: 'user',
    type: mongoose.Types.ObjectId
  }
}, { timestamps: true });

module.exports = mongoose.model('post', postSchema);




// eden user pisuva post