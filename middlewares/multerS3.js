const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const uuid = require("uuid");
aws.config.update({
    region: process.env.bucket_region,
    accessKeyId: process.env.bucket_accesskey,
    secretAccessKey: process.env.bucket_secretkey
});
const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.bucket_name,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, uuid.v4()
            );
        }
    })
})


const DeleteObjects = async (files) => {
    const objects = files.map(k => { return { Key: k.key } });
    console.log(objects);
    try {
        const result = await s3.deleteObjects({ Bucket: process.env.bucket_name, Delete: { Objects: objects } }).promise();
        console.log(result);
    } catch (e) {
        console.log(e);
    }

}
module.exports = { upload, DeleteObjects };