const { GPTTools } = require('../utils')
const { OpenAPI, parseGPT } = GPTTools;


const ChatGPT = {

    generateModerationPromptResponse: async (prompt) => {
        const res = await OpenAPI.command({ type: 'Moderation/General', content: prompt });

        return parseGPT(res.choices[0].message.content);
    },

    generateMentorChat: async (prompt, mentor) => {
        const res = await OpenAPI.command({ type: `AiPersonalities/${mentor}`, content: prompt });

        return res.choices[0].message.content
    },

    generateGamePromptResponse: async (prompt) => {
        const res = await OpenAPI.command({ type: 'Moderation/DalleGame', content: prompt });

        return parseGPT(res.choices[0].message.content);
    },

    generateShortTerm: async (user) => {
        let userGoals = user?.goals?.length ? user.goals.join(' ') : null;
        
        let dynamicPrompt =
            `Generate 5 daily challenges as a goal array i can do throughout the day to improve my wellbeing taking into consideration these goals: ${userGoals}`

        const prompt = userGoals ? dynamicPrompt : 'Generate 5 daily challenges as a goal array'

        const res = await OpenAPI.command({ type: 'DataFormat/ShortTerm', content: prompt });


        return JSON.parse(res.choices[0].message.content);
    }
}

module.exports = ChatGPT;