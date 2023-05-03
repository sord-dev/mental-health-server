const forumRouter = require("./routes/forumRoutes");
const commentRouter = require("./routes/commentsRoutes")

const cors = require("cors");
const express = require("express");


const api = express();

api.use(cors());
api.use(express.json())

api.use("/forum", forumRouter);
api.use("/comments", commentRouter);


module.exports = api;