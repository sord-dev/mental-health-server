const { GPTTools } = require('../utils')
const { OpenAPI, parseGPT } = GPTTools;

const { Mentors } = require('../utils/gpttools/commands/aimentors')

const ChatGPT = { 
    
    generateModerationPromptResponse: async (prompt) => {
        const res = await OpenAPI.command({type: 'Moderation/General', content: prompt});
        
        return parseGPT(res.choices[0].message.content);
    },

    generateMentorChat: async (prompt, mentor) => {
        const res = await OpenAPI.command({type: `AiPersonalities/${Mentors[mentor]}`, content: prompt});

        return res.choices[0].message.content
    },

    generateGamePromptResponse: async (prompt) => {
        const res = await OpenAPI.command({type: 'Moderation/DalleGame', content: prompt});
        
        return parseGPT(res.choices[0].message.content);
    },
}

module.exports = ChatGPT;