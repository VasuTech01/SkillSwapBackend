const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    skills: [{
        type: String,
        required: true,
    }],
    class: {
        type: String,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectID,
        ref: "User"
    },
    files: [{
        filename: {
            type: String,
            trim: true,
            lowercase: true
        },
        originalname: {
            type: String,
        },
        encoding: {
            type:String
        },
        mimetype: {
            type:String
        },
        location: {
            type:String,
        },
        etag: {
           type:String, 
        },
        size: {
            type:Number,
        }
    }]

}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
module.exports=Project;
