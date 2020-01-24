const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userController = require('../../controllers/users');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with minimum 8 characters'
    ).isLength({ min: 8 }),
    check('password', 'Password must contain at least one number').matches(/\d/)
  ],
  userController.registerUser
);

module.exports = router;
