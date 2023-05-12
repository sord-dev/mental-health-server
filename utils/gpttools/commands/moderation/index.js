const fs = require("fs");

const AiModeration = {
    DalleGame: {prompt: fs.readFileSync(__dirname + "/prefix.txt").toString()},
    General: {prompt: fs.readFileSync(__dirname + "/prefix1.txt").toString()}
}

module.exports = AiModeration;