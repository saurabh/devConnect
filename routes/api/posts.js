const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

const postController = require('../../controllers/post');

// @route   POST  api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
  ],
  postController.savePost
);

// @route   GET  api/posts
// @desc    Get all post
// @access  Private
router.get('/', auth, postController.getPosts);

// @route   GET  api/posts/:post_id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, postController.getPostById);

// @route   PUT  api/posts/:post_id
// @desc    Update post
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
  ],
  postController.editPost
);

// @route   DELETE  api/posts/:post_id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, postController.deletePost);

// @route   PUT  api/posts/like/:post_id
// @desc    Like/Unlike a post
// @access  Private
router.put('/like/:id', auth, postController.likePost);

// @route   POST api/posts/comment/:post_id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  postController.addComment
);

// @route   PUT api/posts/comment/:post_id/:comment_id
// @desc    Edit a comment
// @access  Private
router.put(
  '/comment/:id/:comment_id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  postController.editComment
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, postController.deleteComment);

module.exports = router;
