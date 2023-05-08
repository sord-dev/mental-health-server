const User = require('../models/User.js')
const ChatGPT = require('../models/ChatGPT.js')

module.exports.updatePoints = async (req, res) => {
    let { user_id, points } = req.body;

    try {
        const user = await User.findById(user_id);
        const updated = await user.updatePoints(points);

        res.status(200).json({ ...updated, password: null })
    } catch (error) {
        res.json(error)
    }

}

module.exports.updateGoals = async (req, res) => {
    let { user_id, goals } = req.body;

    try {
        const user = await User.findById(user_id);
        const updated = await user.updateGoals(goals);

        res.status(200).json({ ...updated, password: null })
    } catch (error) {
        res.json(error)
    }
}

module.exports.updateMentor = async (req, res) => {
    let { user_id, mentor } = req.body;

    try {
        const user = await User.findById(user_id);
        const updated = await user.updateMentor(mentor);


        res.status(200).json({ ...updated, password: null })
    } catch (error) {
        res.json(error)
    }
}

module.exports.getById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) throw new Error("Invalid ID")
        const result = await User.findById(parseInt(userId))
        res.status(200).send(result)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.generateSTGoals = async (req, res) => {
    try {
        const user = await User.findById(req.body.user_id)
        const goals = await ChatGPT.generateShortTerm(user);

        const updatedUser = await user.updateShortTerm(goals)

        res.status(200).json({ ...updatedUser, password: null })
    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports.completeSTGoal = async (req, res) => {
    try {
        const user = await User.findById(req.body.user_id)
        let goals = user.st_goals;
        let newGoals = goals.map(g => g.id == req.body.goal_id ? { ...g, completed: true } : g)

        const updatedUser = await user.updateShortTerm(newGoals)

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log('error ', error);
        res.status(500).json(error)
    }

}