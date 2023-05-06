const fs = require("fs");

const AiPersonalities = {
    "53f57cad12a2c697226b96c10f12db1d": fs.readFileSync(__dirname + "/default.txt").toString(),
    "87ecafae03a8458690dbc651aa36f177": fs.readFileSync(__dirname + "/david.txt").toString(),
    "420d69b1c41f4761bb557cb5a832160e": fs.readFileSync(__dirname + "/snoop.txt").toString()
}

const Mentors = {
    "Morgan" : "53f57cad12a2c697226b96c10f12db1d",
    "David" : "87ecafae03a8458690dbc651aa36f177",
    "Snoop" : "420d69b1c41f4761bb557cb5a832160e",
}

module.exports = {AiPersonalities, Mentors};