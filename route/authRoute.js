const { signup, login } = require('../controller/authController');
const { validate, signupSchema, loginSchema } = require('../utils/validation');

const router = require('express').Router();

router.route('/signup').post(validate(signupSchema), signup);

router.route('/login').post(validate(loginSchema), login);

module.exports = router;
