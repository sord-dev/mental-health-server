const router = require('express').Router();
const ChatGPT = require('../models/ChatGPT');
const MentorHistory = require('../models/MentorHistory');
const User = require('../models/User');
const sentenceCleaner = require('sentence-cleaner');

const AiPersonalities = require('../utils/gpttools/commands/aimentors');
let personailites = Object.keys(AiPersonalities);

let continueConversation = (memory = [], message = '', mentor = '') => {

    let messages = memory.length ? (memory.map(m => (`${m.role == 'assistant' ? `${mentor}: ` : 'User: '} ${m.content}`)).join('\n') + `\nUser: ${message.content}\n ${mentor}:`) : false;

    return `Without finishing off the input provided, continue this conversation: \n ${ messages || message.content}`;
}

router.post('/chat/clear', async (req, res) => {
    let { user_id, mentor } = req.body;
    if (!user_id || !mentor) return res.status(422).json({ error: 'mentor, user_id are required.' })

    try {
        let userHistory = await MentorHistory.get(user_id);
        let updated = await userHistory.clear(mentor);

        res.status(200).json(updated.history[mentor])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/chat', async (req, res) => { // {message: {content: input, role: 'user'}, mentor: 'David' }
    let { user_id, message, mentor } = req.body;
    if (!user_id || !message || !mentor) return res.status(422).json({ error: 'mentor, user_id and message are required.' })
    let userMessage = {...message, content: sentenceCleaner(message.content)};

    let userHistory = await MentorHistory.get(user_id);
  
    // ask chatgpt to continue this conversation given all the previous messages
    let parsedHistory = continueConversation(userHistory.history[mentor], userMessage, mentor)
    // when messages get too long
    // summarise conversation and save messages to db
    try {
        const response = await ChatGPT.generateMentorChat(parsedHistory, mentor);
        let botResponse = { role: 'assistant', content: response, mentor }
        const history = await userHistory.save(userMessage, botResponse);

        res.status(200).json({ message: response, history: history.history[mentor] });
    } catch (error) {
        res.json({ error: error.message })
    }
})


router.post('/init', async (req, res) => {
    let userHistory = await MentorHistory.get(req.body.user_id);
    if (!userHistory) return res.status(404).json([]);

    return res.status(200).json({ history: userHistory.history[req.body.mentor] });
})

router.get('/info', async (req, res) => {
    res.status(200).json(personailites);
})

const filterDefaults = items => {
    return items.map(([name, p]) => ({ name, price: p.price, category: p.category, thumbnail: p.thumbnail })).filter(i => !!i == true)
};

const filterOwnedMentors = (items, mentors) => {
    return filterDefaults(items).filter(i => {
        let exists = mentors.findIndex(m => m.toLowerCase() == i.name.toLowerCase());
        if (exists == -1) return i
    })
};

router.get('/prices', async (req, res) => { // a route to get all the prices of items
    let personailtiesData = Object.entries(AiPersonalities) // get all items entries
    let info = filterDefaults(personailtiesData) // make an object omitting the prompt value and values with no price (default items)

    res.status(200).json(info); // return priced item objects
})

router.post('/store', async (req, res) => { // a route to get all the prices of items dependant on a user
    let { owned_mentors } = await User.findById(req.body.user_id); // get user owned_mentors
    let personailtiesData = Object.entries(AiPersonalities) // get all items entries

    let info = filterOwnedMentors(personailtiesData, owned_mentors) // make an object omitting the prompt value and values with no price (default items)

    res.status(200).json(info); // return priced item objects
})

router.post('/store/buy', async (req, res) => { // a route to get all the prices of items dependant on a user
    let user = await User.findById(req.body.user_id); // get user owned_mentors
    let mentor = AiPersonalities[req.body.mentor]; // get mentor

    user.owned_mentors.push(mentor);
    let newPoints = user.dabloons -= mentor.price;

    res.status(200).json(user); // return priced item objects
})

module.exports = router;