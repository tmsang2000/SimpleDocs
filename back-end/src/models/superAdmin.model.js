const mongoose = require("mongoose");
import { Schema } from 'mongoose';
import Database from '../database';

var superAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username cannot blank"],
  },

  password: {
    type: String,
    required: [true, "Password name cannot blank"]
  },

  createdAt: {
    type: Number,
    default: new Date()
  },

});

// userSchema.index({ username: 'text'});
// userSchema.index({ firstName: 'text' });
// userSchema.index({ lastName: 'text' });
// userSchema.index({ email: 'text' });
// userSchema.index({ bio: 'text' });

export default Database.model("SuperAdmin", superAdminSchema, "superAdmin");
