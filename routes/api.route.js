const router = require('express').Router();
const authRouter = require('./auth.route.js')

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.use('/auth', authRouter)

module.exports = router;
