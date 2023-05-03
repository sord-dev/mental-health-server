const User = require('../models/User');

module.exports.register = async (req, res) => {
    if (!req.body.username || !req.body.password) return res.status(422).json({ error: 'Incorrect Input' });

    try {
        const user = await User.create(req.body);

        res.status(201).json({ ...user, password: null });
    } catch (error) {
        res.status(422).json({ error: error.message })
    }
}

module.exports.login = async (req, res) => {
    if (!req.body.username || !req.body.password) return res.status(422).json({ error: 'Incorrect Input' });
    try {
        const user = await User.findByUsername(req.body.username)

        if (User.comparePasword(req.body.password, user.password)) res.status(200).json({ ...user, password: null })
        else res.status(401).json({ error: 'Incorrect Password' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
} 