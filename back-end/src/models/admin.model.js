const mongoose = require("mongoose");
import { Schema } from 'mongoose';
import Database from '../database';

var adminSchema = new mongoose.Schema({
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

  userStatus: {

    isBan: {
      type: Boolean,
      default: false,
    },

    reason: {
      type: String,
      default: ''
    }

  },

  profile: {

    name: {
      type: String,
    },

    description: {
      type: String,
    },

    address: {
      type: String,
    },

    phone: {
      type: Number,
    },

    email: {
      type: String,
    },

    profilePicture: {
      original: {
        type: String,
        required: true,
        default: '/upload/1586606612.png'
      },

      thumbnail: {
          type: String,
          required: true,
          default: '/upload/thumbnail/1586606612.png'
      },

      small: {
          type: String,
          required: true,
          default: '/upload/small/1586606612.png'
      }
    }

  },

  follower: [{
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }],

  eventHistory: [{
    event: {
      type: Schema.Types.ObjectId, 
      ref: 'Event'
    },
    isConfirm: {
      type: Boolean,
      default: false,
    }
  }],

  newsHistory: [{
    post: {
      post: {
        type: Schema.Types. ObjectId,
        ref: 'News'
      }
    }
  }]

});

// userSchema.index({ username: 'text'});
// userSchema.index({ firstName: 'text' });
// userSchema.index({ lastName: 'text' });
// userSchema.index({ email: 'text' });
// userSchema.index({ bio: 'text' });

export default Database.model("Admin", adminSchema, "admin");
