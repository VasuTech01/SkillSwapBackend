const mongoose = require("mongoose");
const { Schema,model } = mongoose;
const postSchema = new Schema({
    caption: {
        type: String,
        trim:true
    },
    files: [{
        type: Schema.Types.ObjectId,
        ref: "Files"
    }],
    likes: {
        type: Number
    },
    user_id: { 
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });
const Post = model("Post", postSchema);
module.exports = Post;