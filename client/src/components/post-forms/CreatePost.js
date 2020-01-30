import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/post';

const CreatePost = ({ addPost, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: ''
  });

  const { title, text } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addPost(formData, history);
  };

  return (
    <Fragment className='post-form'>
      <h1 className='large text-primary'>Create a Post</h1>
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
        <Link className='btn btn-light my-1' to='/posts'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreatePost.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(CreatePost);
