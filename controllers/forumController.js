const Forum = require("../models/Forum")

async function index(req, res) {
  try {
    const forums = await Forum.getAll();
    res.status(200).json(forums);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const forum = await Forum.getOneById(id);
    res.status(200).json(forum);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getByUserId(req, res) {
  try {
    const id = parseInt(req.params.id);
    const forums = await Forum.getAllCreatedByUser(id);

    if (forums.length === 0) {
      throw new Error(`User with ID ${id} not found`);
    }

    res.status(200).json(forums);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}


async function create(req, res) {
  const data = req.body;
  if(!data.title) return res.status(422).json({error: 'Incorrect Input, Please Provide Title.'})
  try {
    const forum = await Forum.create(data);
    res.status(201).json(forum);
  } catch (err) {
    const errorMessage = `Failed to create forum: ${err.message}`;
    res.status(500).json({ error: errorMessage });
  }

}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    console.log(id)
    const forum = await Forum.getOneById(id);

    const result = await forum.destroy();
    res.status(204).json({ result, message: 'Forum post deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}


async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Failed to update forum post: title' });
    }

    const forum = await Forum.updateOneById(id, { title, content });

    if (!forum) {
      return res.status(404).json({ error: 'Forum post not found' });
    }

    res.status(200).json({ forum: forum, message: 'Forum post updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { index, destroy, create, getByUserId, getById, update };
