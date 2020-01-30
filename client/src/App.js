import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Register from '../src/components/auth/Register';
import Login from '../src/components/auth/Login';
import Alert from '../src/components/layout/Alert';
import PrivateRoute from '../src/components/routing/PrivateRoute';
import Dashboard from '../src/components/dashboard/Dashboard';
import CreateProfile from '../src/components/profile-forms/CreateProfile';
import EditProfile from '../src/components/profile-forms/EditProfile';
import AddExperience from '../src/components/profile-forms/AddExperience';
import AddEducation from '../src/components/profile-forms/AddEducation';
import Profiles from '../src/components/profiles/Profiles';
import Profile from '../src/components/profile/Profile';
import Posts from '../src/components/posts/Posts';
import CreatePost from '../src/components/post-forms/CreatePost';
import EditPost from '../src/components/post-forms/EditPost';
import Post from '../src/components/post/Post';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/create-post' component={CreatePost} />
              <PrivateRoute exact path='/edit-post/:id' component={EditPost} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
