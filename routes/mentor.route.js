const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT')
let mem = []; // chat short term memory

router.post('/chat', async (req, res) => { // {message: {content: input, role: 'user'}}
    let { message } = req.body;
    mem.push(message)

    let messages = mem.map(m => (`${m.role == 'assistant' ? 'Morgan: ' : 'User: '} ${m.content}`)).join('\n') + '\n Morgan:'; // parse all previous messages into a string
    let parsedHistory = `Continue this conversation: \n ${messages}`; // ask chatgpt to continue this conversation given all the previous messages
    
    if(mem.length > 40) mem = [] // hard limit to chat memory
    console.log(parsedHistory);
    // when messages get too long
    // summarise conversation and save messages to db


    try {
        const response = await ChatGPT.generateMentorChat(parsedHistory);
        mem.push({ role: 'assistant', content: response })

        res.status(200).json({ message: response });
    } catch (error) {
        res.json({ error: error.message })
    }
})


module.exports = router;