const router = require('express').Router();
const passport = require('passport');
let helper = require('../helpers/verify_token')
const userController = require('../controllers/users')

router.get('/', helper.auth, userController.getAll)
router.put('/:id', helper.auth, userController.updateById)
router.delete('/:id', helper.auth, userController.deleteById)
router.get('/signup', userController.signup_page)
router.get('/signin', userController.signin_page)
router.post('/signup', userController.signup)
router.post('/signin', passport.authenticate('local', {session: false}), userController.signin)

module.exports = router;
