const Forum = require("../models/Forum")

async function index (req, res){
    try {
        const forums = await Forum.getAll();
        res.status(200).json(forums);

    } catch (err) {
        res.status(400).json({error : err.message });
    }
}

async function getByUserId (req, res) {
    try {
        const id = parseInt(req.params.id);
        const forums = await Forum.getAllCreatedByUser(id);
        res.status(200).json(forums);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

async function create(req, res) {
    const data = req.body;
    
    if (!data.title || !data.content) {
        res.status(400).json({ error: 'Failed to create forum: title and content are required' });
    } else {
        try {
            const forum = await Forum.create(data);
            res.status(201).json(forum);
        } catch (err) {
            const errorMessage = `Failed to create forum: ${err.message}`;
            res.status(500).json({ error: errorMessage });
        }
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const forum = await Forum.getOneById(id);
        const result = await forum.destroy();
        res.status(200).json({ message: 'Forum post deleted successfully' });
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const { title, content } = req.body;
        if (!title && !content) {
            res.status(400).json({ error: 'Failed to update forum post: title or content are required' });
        } else {
            const forum = await Forum.getOneById(id);

            if (!forum) {
                res.status(404).json({ error: 'Forum post not found' });
            } else {
                forum.title = title || forum.title;
                forum.content = content || forum.content;
                await forum.save();
                res.status(200).json({ message: 'Forum post updated successfully' });
            }
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { index, destroy, create, getByUserId, update };
