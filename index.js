"use strict"
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { connectDB } = require("./DB/connect");
const userRouter = require("./routers/User/Auth");
const projectRouter = require("./routers/User/User");
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
  // console.log(req.headers["user-agent"]);
  // console.log(req.ip);
 // console.log(await setVal(req.ip, req.headers["user-agent"]));
  console.log(await getVal(req.ip));
  res.setHeader("Set-Cookie", `${req.ip}=${req.headers["user-agent"]}`);
  res.send("<center><h1>Hellow World</h1></center>");
});
app.use(userRouter);
app.use(projectRouter);

app.listen(port, async () => {
  console.log("listening on port " + port);
  // const check = await connectDB();
  // check ? console.log("Server Ready") : console.log("DataBase Not Ready");
});
