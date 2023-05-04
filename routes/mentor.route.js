const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT')
const mem = [];

router.post('/chat', async (req, res) => {
    let { message } = req.body;
    mem.push(message)

    let messages = mem.map(m => m.content).join('\n');

    try {
        const response = await ChatGPT.generateMentorChat(messages);

        res.status(200).json({ message: response });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


module.exports = router;