const User = require('../models/User.js')

module.exports.updatePoints = async (req, res) => {
    let { user_id, points } = req.body;

    try {
        const user = await User.findById(user_id);

        const updated = await user.updatePoints(points);

        res.status(200).json({...updated, password: null})
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
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}