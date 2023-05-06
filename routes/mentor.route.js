const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT')

const AiPersonalities = require('../utils/gpttools/commands/aimentors')

const filterDefaults = items => {
    return items.map(([name, p]) => (p.price && { name, price: p.price, category: p.category })).filter(i => !!i == true)
};

let personailites = Object.keys(AiPersonalities);
let mem = personailites.reduce((acc, key) => ({ ...acc, [key]: [] }), {});

router.post('/chat', async (req, res) => { // {message: {content: input, role: 'user'}, mentor: 'David' }
    let { message, mentor } = req.body;
    mem[mentor].push(message)

    // parse all previous messages into a string
    // ask chatgpt to continue this conversation given all the previous messages
    let messages = mem[mentor].map(m => (`${m.role == 'assistant' ? `${mentor}: ` : 'User: '} ${m.content}`)).join('\n') + `\n ${mentor}:`;
    let parsedHistory = `Continue this conversation: \n ${messages}`;

    if (mem[mentor].length > 40) mem[mentor] = [] // hard limit to chat memory

    // when messages get too long
    // summarise conversation and save messages to db
    try {
        const response = await ChatGPT.generateMentorChat(parsedHistory, mentor);
        mem[mentor].push({ role: 'assistant', content: response })

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