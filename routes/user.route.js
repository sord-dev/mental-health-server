const router = require('express').Router();
const controller = require('../controllers/user.contoller.js')

// POST /user/pts - update points
router.patch('/pts', controller.updatePoints);
router.patch('/goals', controller.updateGoals);

router.post('/st/goals', controller.generateSTGoals);
router.patch('/st/goals', controller.completeSTGoal);

router.patch('/mentor', controller.updateMentor);
router.patch('/mentor/buy', controller.updateOwnedMentors);
router.get("/:id", controller.getById)

module.exports = router;