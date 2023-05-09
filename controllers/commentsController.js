const Comment = require('../models/Comment')

async function getByPostId(req, res) {
  const postId = req.params.id;
  try {
    const comments = await Comment.getByPostId(postId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  const data = req.body;
  try {
    const comment = await Comment.create(data);
    res.status(201).json({
      comment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function destroy(req, res) {
  const commentId = req.params.id;
  try {
    const comment = await Comment.getByCommentId(commentId);
    if (!comment) {
      throw new Error(`Comment with ID ${commentId} not found`);
    }
    await comment.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  getByPostId,
  create,
  destroy
};
