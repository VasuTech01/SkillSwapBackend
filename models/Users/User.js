const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema({ 
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique:true,
        require: true,
    },
    phoneno: {
        type: Number,
        required: true,
    }
    ,
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default:"https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    }
}, { timestamps: true });
userSchema.pre("save",async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})
const User = mongoose.model("User", userSchema);

module.exports = User;