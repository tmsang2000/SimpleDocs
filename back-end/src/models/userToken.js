const mongoose = require("mongoose");
import { Schema } from 'mongoose';

const userTokenSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
        unique: true, 
        required: true
    },
    userAgent: {
        type: String,
    },
    ip: {
        type: String,
    },
    isActivated: {
        type: Boolean,
        default: true
    },
    lastTime: {
        type: Date,
        default: Date.now()
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
}).index({
    token: 'text'
});


const UserToken = mongoose.model('UserToken', userTokenSchema, 'userToken');

export default UserToken;