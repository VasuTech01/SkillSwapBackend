const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../config/reacttasklistapp-firebase-adminsdk-58s1s-6a25da3ec7.json");
const app = initializeApp({
    credential: cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
})
const db = getFirestore(app);
const projectRef = db.collection("Projects");
const postsref = db.collection("Posts");
module.exports = { db,projectRef,postsref};