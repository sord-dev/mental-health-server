const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT')

router.get('/', async (req, res) => {
    try {
        const response = await ChatGPT.generateModerationPromptResponse("I very much like my life at the moment it's quite nice!")

        res.json(response)
    } catch (error) {
        res.json({ error: error.message })
    }
})

module.exports = router;