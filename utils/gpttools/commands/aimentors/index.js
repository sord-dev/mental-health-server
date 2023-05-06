const fs = require("fs");

const AiPersonalities = {
    "Morgan": { prompt: fs.readFileSync(__dirname + "/default.txt").toString(), price: 0, category: 'Default' },
    "David Attenborough": { prompt: fs.readFileSync(__dirname + "/david.txt").toString(), price: 120000, category: 'Wise' },
    "Snoop Dogg": { prompt: fs.readFileSync(__dirname + "/snoop.txt").toString(), price: 200000, category: 'Musician' },
    "Bob Ross": { prompt: fs.readFileSync(__dirname + "/bob.txt").toString(), price: 200000, category: 'Nice' },
    "Stephen Hawking": { prompt: fs.readFileSync(__dirname + "/stephen.txt").toString(), price: 200000, category: 'Science' },
    "Lex Friedman": { prompt: fs.readFileSync(__dirname + "/lex.txt").toString(), price: 200000, category: 'CompSci' },
    "William Shakespeare": { prompt: fs.readFileSync(__dirname + "/shakespeare.txt").toString(), price: 200000, category: 'Wise' },
    "Taylor Swift": { prompt: fs.readFileSync(__dirname + "/swift.txt").toString(), price: 200000, category: 'Musician' }
}


module.exports = AiPersonalities;
