const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    closed: {
        type: Boolean,
        default: false,
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
    remote: {
         type:Boolean
    },
    paid: {
        type: Boolean,
        default:false
    },
    files: [{
        type: Schema.Types.ObjectID,
        ref: "Files",
    }]
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
module.exports=Project;
