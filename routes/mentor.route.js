const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT')

router.get('/', async (req, res) => {
    try {
        const response = await ChatGPT.generateMentorChat("Hey Mike")

        res.json(response)
    } catch (error) {
        res.json({ error: error.message })
    }
})

router.post('/chat', async (req, res) => {
    const mem = [];

    mem.push(req.body.message)

    try {
        const response = await ChatGPT.generateMentorChat(...mem);

        res.status(200).json({ message: response });
    } catch (error) {
        res.json({ error: error.message })
    }
})


module.exports = router;