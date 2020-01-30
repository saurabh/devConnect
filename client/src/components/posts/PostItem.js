import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { addPost, updateLike, deletePost } from '../../actions/post';

const PostItem = ({
  auth,
  post: {
    _id,
    title,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
    updated
  },
  updateLike,
  deletePost,
  toggleCommentButton,
  postsPage
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='avatar' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <h2 className='my-1'>{title}</h2>
        {postsPage && text.length > 250 ? (
          <p className='my-1'>
            {text.slice(0, 250)}
            <Link to={`/posts/${_id}`}>...Read more</Link>
          </p>
        ) : (
          <p className='my-1'>{text}</p>
        )}
        <p className='post-date'>
          {updated ? 'Edited' : 'Posted'} on{' '}
          <Moment format='LLL'>{date}</Moment>
        </p>

        <Fragment>
          <button
            onClick={e => updateLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i
              className={`fas fa-thumbs-up ${
                likes.filter(like => like.user.toString() === auth.user._id)
                  .length > 0
                  ? 'liked'
                  : ''
              }`}
            />{' '}
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          {toggleCommentButton ? (
            <button type='button' className='btn' disabled>
              <i className='fas fa-comment-alt' />{' '}
              {comments.length > 0 && <span>{comments.length}</span>}{' '}
              {comments.length > 1 ? 'Comments' : 'Comment'}
            </button>
          ) : (
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              <i className='fas fa-comment-alt' />{' '}
              {comments.length > 0 && <span>{comments.length}</span>}{' '}
              {comments.length > 1 ? 'Comments' : 'Comment'}
            </Link>
          )}
          {!postsPage && !auth.loading && user === auth.user._id && (
            <Link to={`/edit-post/${_id}`} className='btn btn-secondary'>
              <i className='fas fa-edit'></i>
            </Link>
          )}
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={e => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </Fragment>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  toggleCommentButton: false,
  postsPage: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  updateLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addPost, updateLike, deletePost })(
  PostItem
);
