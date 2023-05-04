const { GPTTools } = require('../utils')
const { OpenAPI, parseGPT } = GPTTools;

const ChatGPT = { 
    
    generateModerationPromptResponse: async (prompt) => {
        const res = await OpenAPI.command({type: 'Moderation/General', content: prompt});
        
        return parseGPT(res.choices[0].message.content);
    },

    generateGamePromptResponse: async (prompt) => {
        const res = await OpenAPI.command({type: 'Moderation/DalleGame', content: prompt});
        if(!res?.choices) throw new Error('Error generating recipe')
        return parseGPT(res.choices[0].message.content);
    },
}

module.exports = ChatGPT;