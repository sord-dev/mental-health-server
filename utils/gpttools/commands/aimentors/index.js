const fs = require("fs");

const AiPersonalities = {
    "Morgan": { prompt: fs.readFileSync(__dirname + "/default.txt").toString(), price: 0, category: 'Default' },
    "David Attenborough": { prompt: fs.readFileSync(__dirname + "/david.txt").toString(), price: 120000, category: 'Wise', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105144256248680508/david.png" },
    "Snoop Dogg": { prompt: fs.readFileSync(__dirname + "/snoop.txt").toString(), price: 200000, category: 'Musician', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105138604428251248/snoopy_1.png" },
    "Bob Ross": { prompt: fs.readFileSync(__dirname + "/bob.txt").toString(), price: 200000, category: 'Nice', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105150708132610058/bobby.png" },
    "Stephen Hawking": { prompt: fs.readFileSync(__dirname + "/stephen.txt").toString(), price: 200000, category: 'Science', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105148477530460271/hawking_2.png" },
    "Lex Friedman": { prompt: fs.readFileSync(__dirname + "/lex.txt").toString(), price: 200000, category: 'CompSci', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105150318070747297/lex_fridman_by_nicholaskay_defdq7i-pre.png" },
    "William Shakespeare": { prompt: fs.readFileSync(__dirname + "/shakespeare.txt").toString(), price: 200000, category: 'Wise', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105146956373835927/3411cd0986c340a9bf980edc4f3d85f4.png" },
    "Taylor Swift": { prompt: fs.readFileSync(__dirname + "/swift.txt").toString(), price: 200000, category: 'Musician', thumbnail: "https://cdn.discordapp.com/attachments/1080425253030862849/1105139947859619972/taylor_1.png" },
    "Morgan Freeman": { prompt: fs.readFileSync(__dirname + "/freeman.txt").toString(), price: 250000, category: 'Nice', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105142940260651098/morgan_freeman.png" }
}


module.exports = AiPersonalities;
