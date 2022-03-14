const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  friends: [{
    type: mongoose.Types.ObjectId, 
    ref: 'user'
  }]
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);


//koga ke se stisne add friend.. toj user treba da vleze vo bazata na userot vo friends