require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const config = new Configuration({ apiKey: process.env.OPEN_AI_API_KEY })
const OpenAPI = new OpenAIApi(config);
const fs = require("fs");
module.exports.OpenAPI = OpenAPI;
