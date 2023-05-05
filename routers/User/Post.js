const express = require("express");
const mongoose = require("mongoose");
const Post = require("../../models/Projects/Post");
const Files = require("../../models/Files/Files");
const { postsref } = require("../../DB/FireBase");
const { upload, DeleteObjects } = require("../../middlewares/multerS3");
const router = express.Router();
router.put("/post/create", upload.array("post_files"),async (req, res) => {
    const body = req.body;
     const files = req.files;
    console.log(files);
    try {
        const post = new Post(body);
        const files_ = await Files.create(req.files);
        const fileids = files_.map(r => r._id.toString());
        post.files.push(...fileids);
        const rs = await post.save();
        const { caption, files, user_id, _id } = rs;
        const firepost = Object.assign({},{ caption, fileids, user: user_id.toString(), id: _id.toString() });
        const r = await postsref.add(firepost);
        console.log(r);
        res.status(200).send(firepost);
    } catch (e) {
        console.log(e);
        await DeleteObjects(files);
        res.status(500).send("Error: "+e.message);
    }
})


router.get("/post/:id", async (req, res) => {

    const { id } = req.params
    try {
        const post = await Post.find({ _id: id });
        console.log(post);
        const resp1 = await post[0].populate("user_id");
        const resp2 = await resp1.populate("files");
        res.status(200).send(resp2);
    } catch (e) {
        res.status(500).send(e);
    }
})
router.delete("/post/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            throw new Error("Erro While Deleting");
        }
        res.status(200).send(post);

    } catch (e) {
        res.status(500).send("Error:" + e.message);
    }
})
module.exports = router;
