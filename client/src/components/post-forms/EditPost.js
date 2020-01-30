import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePost, getPost } from '../../actions/post';

const EditPost = ({
  post: { post, loading },
  updatePost,
  getPost,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    title: '',
    text: ''
  });

  useEffect(() => {
    getPost(match.params.id);
    setFormData({
      title: loading || !post.title ? '' : post.title,
      text: loading || !post.text ? '' : post.text
    });
  }, [loading, getPost]);

  const { title, text } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updatePost(post._id, formData, history);
  };

  return (
    <Fragment className='post-form'>
      <h1 className='large text-primary'>Edit Post</h1>
      <small>* = required field</small>
      <form onSubmit={e => onSubmit(e)} className='form my-1'>
        <div className='form-group'>
          <textarea
            name='title'
            cols='30'
            rows='1'
            placeholder='* Post title '
            value={title}
            onChange={e => onChange(e)}
            required
            disabled
          ></textarea>
        </div>
        <div className='form-group'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Post body (optional)..'
            value={text}
            onChange={e => onChange(e)}
          ></textarea>
        </div>

        <input type='submit' className='btn btn-dark my-1' value='Submit' />
        <Link className='btn btn-light my-1' to={`/posts/${post._id}`}>
          Back to Post
        </Link>
      </form>
    </Fragment>
  );
};

EditPost.propTypes = {
  updatePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { updatePost, getPost })(EditPost);
