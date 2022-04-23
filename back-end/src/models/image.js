const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: String,
    image_path: String,
    created_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("image", imageSchema);
