const fs = require("fs");

const AiPersonalities = {
    "Morgan": { prompt: fs.readFileSync(__dirname + "/default.txt").toString(), price: 0, category: 'Default' },
    "David": { prompt: fs.readFileSync(__dirname + "/david.txt").toString(), price: 120000, category: 'Wise' },
    "Snoop": { prompt: fs.readFileSync(__dirname + "/snoop.txt").toString(), price: 200000, category: 'Joke' }
}

module.exports = AiPersonalities;