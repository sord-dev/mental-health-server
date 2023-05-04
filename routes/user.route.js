const router = require('express').Router();
const controller = require('../controllers/user.contoller.js')

// POST /user/pts - update points
router.post('/pts', controller.updatePoints);

module.exports = router;