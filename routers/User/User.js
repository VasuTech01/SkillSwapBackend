const express = require("express");
const mongoose = require("mongoose");
const Project = require("../../models/Projects/Project");
const Files = require("../../models/Files/Files");
const { projectRef } = require("../../DB/FireBase");
const { upload, DeleteObjects } = require("../../middlewares/multerS3");
const router = express.Router();
router.put("/projects/create", async (req, res) => {
    const body = req?.body;
    console.log(body);
    const project = new Project(body);
    try {
        const resp = await project.save();
        if (!resp) {
            throw new Error("Errro while Creating");
        }
        const customUser = Object.assign({}, { title: resp.title, description: resp.description, skills: resp.skills, class: resp.class, user: resp.user_id.toString(), project_id: resp._id.toString() });
        console.log(customUser);
        const r = await projectRef.add(customUser);
        console.log(r);
        res.status(200).send(resp);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

router.post("/projects/file_upload", upload.array("upload_file"), async (req, res) => {
    const body = req.body;
    try {
        const project = await Project.find({ _id: body.id });
        console.log(project);
        if (!project || project.length === 0) {
            throw new Error("Project Not Found");
        }
        const files = await Files.create(req.files);
        const fileids = files.map(r => r._id);
        if (!files) {
            throw new Error("Error Saving Files data");
        }

        project[0].files.push(...fileids);

        const pr = await project[0].save();
        res.status(200).send(pr);
    } catch (e) {
        await DeleteObjects(req.files);
        res.status(500).send("Error: " + e.message);
    }
});

router.get("/projects/:id", async (req, res) => {

    const { id } = req.params
    try {
        const project = await Project.find({ _id: id });
        console.log(project);
        const resp1 = await project[0].populate("user_id");
        const resp2 = await project[0].populate("files");
        console.log(project[0]);
        res.status(200).send(project[0]);
    } catch (e) {
        res.status(500).send(e);
    }
})
router.delete("/projects/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            throw new Error("Erro While Deleting");
        }
        res.status(200).send(project);

    } catch (e) {
        res.status(500).send("Error:" + e.message);
    }
})





module.exports = router;
