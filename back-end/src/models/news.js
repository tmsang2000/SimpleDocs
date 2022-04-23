const mongoose = require("mongoose");

var newsSchema = new mongoose.Schema({

    userCreated: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true]
    },

    createdForm: {

        title: {
            type: String,
            required: [true, 'Event name cannot blank']
        },

        content: {
            type: String
        },

        createdAt: {
            type: Number,
            default: Date.now(),
        },

        writtenAt: {
            type: Number,
        },

        source:{
            type: String,
        },

        author: {
            type: String
        },

        location: {
            type: String
        },

        type: {
            type: String,
            required: [true, 'Type cannot blank']
        },

        isImportant: {
            type: Boolean,
            default: false,
        },

        updatedAt: {
            type: Number,
        },

        media: {

            type: {
                type: String,
            },

            path: {
                original: {
                    type: String,
                    required: true,
                },
                thumbnail: {
                    type: String,
                    required: true,
                },
                small: {
                    type: String,
                    required: true,
                }
            }

        },
        
    },
    
});

export default mongoose.model("News", newsSchema, "news");