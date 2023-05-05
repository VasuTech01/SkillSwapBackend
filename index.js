"use strict"
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { connectDB } = require("./DB/connect");
const userRouter = require("./routers/User/Auth");
const projectRouter = require("./routers/User/User");
const postRouter = require("./routers/User/Post");
const { projectRef } = require("./DB/FireBase");
const { setVal, getVal } = require("./middlewares/UserTrack");
(async () => {
  const check = await connectDB();
  check ? console.log("Server Ready") : console.log("DataBase Not Ready");
})()
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(session({
//   secret: "IndiaisGreat",
//   resave: false,
//   name:"_redistoreconnection",
//   cookie: {
//     secure: true,    
//   },
//   saveUninitialized: true,
//   store:new redisStore({client:redis})
// }));

app.get("/",async (req, res) => {
   
  try {
    const snapshot = await projectRef.doc("AQX5xwWUfz8DMVo0z9XQ").delete();
    console.log(snapshot);
    res.send("<center><h1>Hellow World</h1></center>");
  } catch (e) {
    
  }
 
  
});
app.use(userRouter);
app.use(projectRouter);
app.use(postRouter);

app.listen(port, async () => {
  console.log("listening on port " + port);
  // const check = await connectDB();
  // check ? console.log("Server Ready") : console.log("DataBase Not Ready");
});
