const fs = require("fs");

const AiPersonalities = {
    Morgan: fs.readFileSync(__dirname + "/default.txt").toString(),
    David: fs.readFileSync(__dirname + "/david.txt").toString()
}

const Mentors = {
    "53f57cad12a2c697226b96c10f12db1d" : "Morgan",
    "87ecafae03a8458690dbc651aa36f177" : "David"
}

module.exports = {AiPersonalities, Mentors};