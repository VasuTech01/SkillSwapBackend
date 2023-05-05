const { Schema,model } = require("mongoose");
const FileSchema = new Schema({
    filename: {
        type: String,
        trim: true,
        lowercase: true
    },
    originalname: {
        type: String,
    },
    encoding: {
        type: String
    },
    mimetype: {
        type: String
    },
    location: {
        type: String,
    },
    etag: {
        type: String,
    },
    size: {
        type: Number,
    },
    key: {
        type: String
    }
}, { timestamps: true });
const Files = model("Files", FileSchema);
module.exports = Files;