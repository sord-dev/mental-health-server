const fs = require("fs");

const AiPersonalities = {
    "Morgan": { prompt: fs.readFileSync(__dirname + "/default.txt").toString(), price: 0, category: 'Default', thumbnail: "https://cdn.discordapp.com/attachments/1080425253030862849/1105592182297075722/c48b95698b4245a8bd0e95958e449767.png" },
    "David Attenborough": { prompt: fs.readFileSync(__dirname + "/david.txt").toString(), price: 120000, category: 'Wise', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105144256248680508/david.png" },
    "Snoop Dogg": { prompt: fs.readFileSync(__dirname + "/snoop.txt").toString(), price: 200000, category: 'Musician', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105138604428251248/snoopy_1.png" },
    "Bob Ross": { prompt: fs.readFileSync(__dirname + "/bob.txt").toString(), price: 200000, category: 'Wise', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105150708132610058/bobby.png" },
    "Stephen Hawking": { prompt: fs.readFileSync(__dirname + "/stephen.txt").toString(), price: 200000, category: 'Intellectual', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105148477530460271/hawking_2.png" },
    "Lex Friedman": { prompt: fs.readFileSync(__dirname + "/lex.txt").toString(), price: 200000, category: 'Intellectual', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105150318070747297/lex_fridman_by_nicholaskay_defdq7i-pre.png" },
    "William Shakespeare": { prompt: fs.readFileSync(__dirname + "/shakespeare.txt").toString(), price: 200000, category: 'Wise', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105146956373835927/3411cd0986c340a9bf980edc4f3d85f4.png" },
    "Taylor Swift": { prompt: fs.readFileSync(__dirname + "/swift.txt").toString(), price: 200000, category: 'Musician', thumbnail: "https://cdn.discordapp.com/attachments/1080425253030862849/1105139947859619972/taylor_1.png" },
    "Morgan Freeman": { prompt: fs.readFileSync(__dirname + "/freeman.txt").toString(), price: 250000, category: 'Wise', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105142940260651098/morgan_freeman.png" },
    "Princess Zelda": { prompt: fs.readFileSync(__dirname + "/zelda.txt").toString(), price: 250000, category: 'Fictional', thumbnail: "https://media.discordapp.net/attachments/1080425253030862849/1105810486433427547/Fomh8msXEAcC4F6.png" },
    "GLaDOS": { prompt: fs.readFileSync(__dirname + "/glados.txt").toString(), price: 1500000, category: 'Fictional', thumbnail: "https://cdn.discordapp.com/attachments/1080425253030862849/1105787295874949130/latest.png" },
    "Alyx Vance": { prompt: fs.readFileSync(__dirname + "/alyx.txt").toString(), price: 1500000, category: 'Fictional', thumbnail: "https://cdn.discordapp.com/attachments/1080425253030862849/1105792284714340393/latest.png" },
    "Master Chief": { prompt: fs.readFileSync(__dirname + "/master-chief.txt").toString(), price: 1500000, category: 'Fictional', thumbnail: "https://cdn.discordapp.com/attachments/1080425253030862849/1105804376578203708/20211202_Halo_3x2.png" }
}


module.exports = AiPersonalities;
