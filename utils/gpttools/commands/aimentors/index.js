const fs = require("fs");

const AiPersonalities = {
    "53f57cad12a2c697226b96c10f12db1d": fs.readFileSync(__dirname + "/default.txt").toString(),
    "87ecafae03a8458690dbc651aa36f177": fs.readFileSync(__dirname + "/david.txt").toString(),
    "420d69b1c41f4761bb557cb5a832160e": fs.readFileSync(__dirname + "/snoop.txt").toString(),
    "dfd5975c5f3803b09d5e70b3e6afd2d6": fs.readFileSync(__dirname + "/bob.txt").toString(),
    "c8ae361afa91f62aa36de9b0bfa8fe21": fs.readFileSync(__dirname + "/stephen.txt").toString(),
    "e00c5ea793d6847ef3959ab87b4c1db6": fs.readFileSync(__dirname + "/lex.txt").toString(),
    "48c0fce9d380ac7ab3bbcecceda2ba55": fs.readFileSync(__dirname + "/shakespeare.txt").toString(),
    "e00c5ea793d6847ef3959ab87b4c1db6": fs.readFileSync(__dirname + "/swift.txt").toString()
}

const Mentors = {
    "Morgan" : "53f57cad12a2c697226b96c10f12db1d",
    "David" : "87ecafae03a8458690dbc651aa36f177",
    "Snoop" : "420d69b1c41f4761bb557cb5a832160e",
    "Bob" : "dfd5975c5f3803b09d5e70b3e6afd2d6",
    "Stephen" : "c8ae361afa91f62aa36de9b0bfa8fe21",
    "Lex" : "e00c5ea793d6847ef3959ab87b4c1db6",
    "Shakespeare" : "48c0fce9d380ac7ab3bbcecceda2ba55",
    "Swift" : "e00c5ea793d6847ef3959ab87b4c1db6",
}

module.exports = {AiPersonalities, Mentors};