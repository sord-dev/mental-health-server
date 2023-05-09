const {Router } = require('express')

const forumController = require('../controllers/forumController')

const forumRouter = Router();

forumRouter.get("/", forumController.index);
forumRouter.get("/forum/:id", forumController.getById);
forumRouter.get("user/:id", forumController.getByUserId);
forumRouter.post("/", forumController.create);
forumRouter.delete("/:id", forumController.destroy);
forumRouter.patch("/:id", forumController.update);

module.exports = forumRouter;