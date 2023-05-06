const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT')

const { Mentors } = require('../utils/gpttools/commands/aimentors')

let mem = []; // chat short term memory
router.post('/chat', async (req, res) => { // {message: {content: input, role: 'user'}, mentor: 378278931278hijdfa }
    let { message, mentor } = req.body;
    mem.push(message)

    let messages = mem.map(m => (`${m.role == 'assistant' ? `${Mentors[mentor]}: ` : 'User: '} ${m.content}`)).join('\n') + `\n ${Mentors[mentor]}:`; // parse all previous messages into a string
    let parsedHistory = `Continue this conversation: \n ${messages}`; // ask chatgpt to continue this conversation given all the previous messages
    
    if(mem.length > 40) mem = [] // hard limit to chat memory
    console.log(parsedHistory);
    
    // when messages get too long
    // summarise conversation and save messages to db

    try {
        const response = await ChatGPT.generateMentorChat(parsedHistory, mentor);
        mem.push({ role: 'assistant', content: response })

        res.status(200).json({ message: response });
    } catch (error) {
        res.json({ error: error.message })
    }
})


module.exports = router;