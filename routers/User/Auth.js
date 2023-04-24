const express = require("express");
const mongoose = require("mongoose");
const User = require("../../models/Users/User");
const bcrypt = require("bcrypt");
const { upload } = require("../../middlewares/multerS3");
const router = express.Router();
router.put("/user/signup", async (req, res) => {
    const body = req.body;
    console.log(req.sessionID)
    console.log(body);
    const user = new User({ ...body });
    try {
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        console.log(e.message);
        res.status(500).send(e.message);
    }
})
router.get("/user/signin", async (req, res) => {
    const body = req.body;
    console.log(req);
    console.log(req.sessionID)
    try {
        const user = await User.findOne({ email: body.email });
        if (!user) {
            throw new Error("Not Found");
            return;
        }
        const f = await bcrypt.compare(body.password, user.password);
        if (f) {
            res.status(200).send("You are logged In");
        } else {
            res.status(500).send("<h1> <a href='/'>Password Not Matching</a></h1>");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
})

router.post("/user/avatar", upload.single("avatar"), async (req, res) => {
    console.log(req.file);
    try {
        const { id } = req.body;
        console.log(id);
        const user = await User.findOne({ _id: id });
        console.log(user)
        if (!user) {
            throw new Error("User Not Found");
        }
        user.avatar = req.file.location;
        await user.save();
        res.status(200).send(user.location);
    }
    catch (e) {
        res.status(500).send(e);
    }
})
router.get("/user/avatar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        console.log(user);
        if (!user) {
            throw new Error("User Not Found");
        }
       
        res.status(200).send({ avatar:user.avatar });
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
})



module.exports = router;