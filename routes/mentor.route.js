const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT')
const mem = [];

router.get('/', async (req, res) => {
    try {
        const response = await ChatGPT.generateMentorChat("Hey Mike")

        res.json(response)
    } catch (error) {
        res.json({ error: error.message })
    }
})

router.post('/chat', async (req, res) => {
    let { message } = req.body;
    mem.push(message)

    let messages = mem.map(m => m.content).join('\n');

    try {
        const response = await ChatGPT.generateMentorChat(messages);

        res.status(200).json({ message: response });
    } catch (error) {
        res.json({ error: error.message })
    }
})


module.exports = router;