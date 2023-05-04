const router = require('express').Router();
const authRouter = require('./auth.route.js')
const gameRouter = require("./game.route.js");
const forumRouter = require("./forumRoutes");
const commentRouter = require("./commentsRoutes")

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.use("/forums", forumRouter);
router.use("/comments", commentRouter);
router.use('/games', gameRouter);
router.use('/auth', authRouter);

module.exports = router;
