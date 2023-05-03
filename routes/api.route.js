const router = require('express').Router();
const authRouter = require('./auth.route.js')
const forumRouter = require("./forumRoutes");
const commentRouter = require("./commentsRoutes")

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.use("/forum", forumRouter);
router.use("/comments", commentRouter);
router.use('/auth', authRouter)

module.exports = router;
