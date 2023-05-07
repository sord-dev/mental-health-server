const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT')
const DallE = require('../models/DallE')

router.get('/initiateGame', async (req, res) => {
    try {
        const initialPrompt = await ChatGPT.generateGamePromptResponse("I have mixed feelings about myself. Help me to understand them.")
        const dallE = await DallE.generateImage(initialPrompt.dall_e_ink)
        res.json(dallE)
    } catch (error) {
        res.json({ error: error.message })
    }
})

router.post('/createImage', async (req, res) => {
    try {
        const givenPrompt = req.body.prompt;

        const prompt = await DallE.generateImage(givenPrompt)
        res.json(prompt)
    }
    catch (error) {
        res.json({ error: error.message })
    }
})

router.post('/checkAnswer', async (req, res) => {
    try {
        console.log(req.body)
        const prompt = await ChatGPT.generateGamePromptResponse(req.body.answer)
        res.json(prompt)
    }
    catch (error) {  
        res.json({ error: error.message })
    }
})


module.exports = router;