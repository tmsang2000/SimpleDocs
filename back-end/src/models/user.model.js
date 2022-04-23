const mongoose = require("mongoose");
import { Schema } from 'mongoose';
import Database from '../database';

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username cannot blank"],
  },

  password: {
    type: String,
    required: [true, "password name cannot blank"]
  },

  createdAt: {
    type: Number,
    default: new Date()
  },

  studentCardPicture: {
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
  },

  userStatus: {

    isActivated: {
      type: Boolean,
      default: false
    },

    activatedStatus: {
      type: String,
      default: 'notActivated' // notActivated, waiting, success, fail
    },

    isBan: {
      type: Boolean,
      default: false,
    },

    banReason: {
      type: String,
      default: ''
    }

  },

  profile: {

    lastName: {
      type: String,
    },

    firstName: {
      type: String,
    },

    fullName: {
      type: String,
    },

    description: {
      type: String,
    },

    dob: {
      type: Number,
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

    gender: {
      type: String,
    },

    studentId: {
      type: Number,
    },

    classId: {
      type: Number,
    },

    socialDays: {
      type: Number,
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

  following: [{
    type: Schema.Types.ObjectId, 
    ref: 'Admin'
  }],

  eventStaff: [{

    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    },

    isAttempt: {
      type: Boolean,
      default: false,
    },

    attemptAt: {
      type: Number,
    },

    socialDays: {
      type: Number,
      default: 0,
    },

    reason: {
      type: String,
      default: '',
    },

    role: {
      type: String,
      required: true,
    }

  }],

  eventRegisteredHistory: [{

    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    },

    checkAttendance: {

      firstCheck: {
        checkedTime: {
          type: Number,
        },
        isCheck: {
          type: Boolean,
          default: false,
        }
      },

      secondCheck: {
        checkedTime: {
          type: Number,
        },
        isCheck: {
          type: Boolean,
          default: false,
        }
      },

    },

    socialDays: {
      type: Number,
      default: 0,
    },

    isAttempt: {
      type: Boolean,
      default: false,
    },

    registeredAt: {
      type: Number,
      default: Date.now(),
    },
  }]

});

// userSchema.index({ username: 'text'});
// userSchema.index({ firstName: 'text' });
// userSchema.index({ lastName: 'text' });
// userSchema.index({ email: 'text' });
// userSchema.index({ bio: 'text' });

export default Database.model("User", userSchema, "user");
