const express = require("express");
const mongoose = require("mongoose");
const Project = require("../../models/Projects/Project");
const { upload ,DeleteObjects} = require("../../middlewares/multerS3");
const router = express.Router();
router.put("/projects/create", async (req, res) => {
    
    console.log(req);
    const body = req?.body;
    console.log(body);
    const project = new Project(body);
    try {  
        const resp = await project.save();
        if (!resp) {
            throw new Error("Errro while Creating");
        }
        res.status(200).send(resp);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})
router.post("/projects/file_upload", upload.array("upload_file"), async (req, res) => {
    const body = req.body;
    try {
        console.log(req.files);
        const project = await Project.find({ _id: body.id });
        if (!project||project.length===0) {
            throw new Error("Project Not Found");
        }
        console.log(project);
        project[0].files = project[0].files.concat(...req.files);
        await project[0].save(); 
        res.status(200).send(req.files);
    } catch (e) {
        await DeleteObjects(req.files);
        res.status(500).send("Error: "+e.message);
     }
}); 
router.get("/projects/:id", async (req, res) => {
   
    const { id}=req.params
    try {
        const project = await Project.find({ _id: id });
        console.log(project);
        const resp=await project[0].populate("user_id");
        res.status(200).send(resp);
    } catch (e) {
        res.status(500).send(e);
    }
})




module.exports = router;
