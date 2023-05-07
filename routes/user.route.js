const router = require('express').Router();
const controller = require('../controllers/user.contoller.js')

// POST /user/pts - update points
router.patch('/pts', controller.updatePoints);
router.patch('/goals', controller.updateGoals);

router.post('/st/goals', controller.generateSTGoals);

router.patch('/mentor', controller.updateMentor);
router.get("/:id", controller.getById)

module.exports = router;