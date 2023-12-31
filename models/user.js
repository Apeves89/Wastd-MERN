const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  username: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photoUrl: String,
  bio: String
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  },
  toObject: {
    transform: function(doc, ret, opt) {
      delete ret.password;
      return ret;
    }
  }
});

// DO NOT DEFINE instance methods with arrow functions,
// they prevent the binding of this
// user.save() or User.create()
userSchema.pre("save", function (next) {
    // 'this' will be set to the current document
    const user = this;
    // check to see if the user has been modified, if not proceed
    // in the middleware chain
    if (!user.isModified("password")) return next();
    // password has been changed - salt and hash it
    bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
      if (err) return next(err);
      // replace the user provided password with the hash
      user.password = hash;
      next(); // continue doing what you were doing, put the user 
      // object in the db with the hash as the password!
    });
  });
  
  module.exports = mongoose.model("User", userSchema);