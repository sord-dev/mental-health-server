const fs = require('fs');
const AiPersonalities = require('./aimentors');
const Moderation = require('./moderation');

const GPTConfig = {
    AiPersonalities,
    Moderation,
    DataFormat: { ShortTerm: { prompt: fs.readFileSync(__dirname + "/dataformat.txt").toString() } }
}

module.exports = GPTConfig;