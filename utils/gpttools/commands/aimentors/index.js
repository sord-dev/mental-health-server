const fs = require("fs");

const AiPersonalities = {
    Morgan: fs.readFileSync(__dirname + "/default.txt").toString(),
    David: fs.readFileSync(__dirname + "/david.txt").toString()
}

module.exports = AiPersonalities;