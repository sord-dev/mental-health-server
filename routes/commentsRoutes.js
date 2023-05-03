const {Router } = require('express')

const commentController = require('../controllers/commentsController.js')

const commentRouter = Router();

commentRouter.get("/:id", commentController.getByPostId);
commentRouter.post("/", commentController.create);
commentRouter.delete("/:id", commentController.destroy);

module.exports = commentRouter;