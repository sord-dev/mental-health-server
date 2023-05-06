require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({ apiKey: process.env.OPEN_AI_API_KEY });
const OpenAPI = new OpenAIApi(config);
const GPTCommands = require('./commands')

OpenAPI.command = async ({ type, content }) => {
    let typeCmd = type ? type.split('/') : null; // parse command type
    let prefix = typeCmd ? GPTCommands[typeCmd[0]][typeCmd[1]] : ''; // get init prefix for ChatGPT Model
    console.log(type.split('/'));

    let cmd = { role: "user", content: prefix + ' ' + content };

    try {
        const res = await OpenAPI.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages:  [cmd],
            temperature: 0.4,
        });

        return res.data;
    } catch (e) {
        console.log(e);
    }
};

module.exports.OpenAPI = OpenAPI;
module.exports.parseGPT = require("./parseGPT");
