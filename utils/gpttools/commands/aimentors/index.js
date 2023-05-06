const fs = require("fs");

const AiPersonalities = {
    "Morgan": { prompt: fs.readFileSync(__dirname + "/default.txt").toString(), price: 0, category: 'Default' },
    "David": { prompt: fs.readFileSync(__dirname + "/david.txt").toString(), price: 120000, category: 'Wise' },
    "Snoop": { prompt: fs.readFileSync(__dirname + "/snoop.txt").toString(), price: 200000, category: 'Joke' },
    "Bob": { prompt: fs.readFileSync(__dirname + "/bob.txt").toString(), price: 200000, category: 'Nice' },
    "Stephen": { prompt: fs.readFileSync(__dirname + "/stephen.txt").toString(), price: 200000, category: 'Science' },
    "Lex": { prompt: fs.readFileSync(__dirname + "/lex.txt").toString(), price: 200000, category: 'CompSci' },
    "Shakespear": { prompt: fs.readFileSync(__dirname + "/shakespeare.txt").toString(), price: 200000, category: 'Wise' },
    "Swift": { prompt: fs.readFileSync(__dirname + "/swift.txt").toString(), price: 200000, category: 'Joke' }
}


module.exports = AiPersonalities;
