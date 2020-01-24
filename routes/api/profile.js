const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

const profileController = require('../../controllers/profile');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, profileController.getProfile);

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public
router.get('/', profileController.getAllProfiles);

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills are required')
        .not()
        .isEmpty()
    ]
  ],
  profileController.saveProfile
);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', profileController.getProfileById);

// @route   DELETE api/profile/
// @desc    Delete profiles, user & posts
// @access  Private
router.delete('/', auth);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  profileController.addExperience
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, profileController.deleteExperience);

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', auth, profileController.addEducation);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', auth, profileController.deleteEducation);

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', profileController.getGithubRepos);

module.exports = router;
