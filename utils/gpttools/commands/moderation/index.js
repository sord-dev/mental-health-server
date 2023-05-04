const fs = require("fs");

const AiModeration = {
    DalleGame: fs.readFileSync(__dirname + "/prefix.txt").toString(),
    General: fs.readFileSync(__dirname + "/prefix1.txt").toString()
}

module.exports = AiModeration;