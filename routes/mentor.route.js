const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT');
const MentorHistory = require('../models/MentorHistory');

const AiPersonalities = require('../utils/gpttools/commands/aimentors');
let personailites = Object.keys(AiPersonalities);

const filterDefaults = items => {
    return items.map(([name, p]) => (p.price && { name, price: p.price, category: p.category })).filter(i => !!i == true)
};




router.post('/chat', async (req, res) => { // {message: {content: input, role: 'user'}, mentor: 'David' }
    let { user_id, message, mentor } = req.body;

    let userHistory = await MentorHistory.get(user_id);
    let mem = userHistory.history;
    let userMessage = message;

    // parse all previous messages into a string
    // ask chatgpt to continue this conversation given all the previous messages
    let messages = mem[mentor] ? mem[mentor].map(m => (`${m.role == 'assistant' ? `${mentor}: ` : 'User: '} ${m.content} User: ${userMessage.content}`)).join('\n') + `\n ${mentor}:` : null;
    let parsedHistory = messages ? `Continue this conversation: \n ${messages}` : message.content;

    // when messages get too long
    // summarise conversation and save messages to db
    try {
        const response = await ChatGPT.generateMentorChat(parsedHistory, mentor);

        let botResponse = { role: 'assistant', content: response, mentor }

        await userHistory.save(userMessage, botResponse);

        res.status(200).json({ message: response });
    } catch (error) {
        res.json({ error: error.message })
    }
})

router.get('/info', async (req, res) => {
    res.status(200).json(personailites);
})

router.get('/prices', async (req, res) => { // a route to get all the prices of items
    let personailtiesData = Object.entries(AiPersonalities) // get all items entries
    let info = filterDefaults(personailtiesData) // make an object omitting the prompt value and values with no price (default items)

    res.status(200).json(info); // return priced item objects
})

module.exports = router;