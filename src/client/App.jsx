import React, { Component } from 'react';

import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

import PostSection from './components/PostSection.jsx';
import CreateSection from './components/CreateSection.jsx';

// Import App Styling
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logInForm: {
        email: '',
        password: '',
        remember: true,
      },
      registerForm: {
        cohort: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        secretCode: '',
      },
      formDisplay: 'login',
      // name: '',
      notStarted: [],
      inProgress: [],
      closed: [],
      loggedIn: false,
      // role: '',
      // userid: 0,
    };

    this.changeStatus = this.changeStatus.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.showForm = this.showForm.bind(this);
    this.onLoginHandler = this.onLoginHandler.bind(this);
    this.onSignupChangedHandler = this.onSignupChangedHandler.bind(this);
    this.onSignupNameChangeHandler = this.onSignupNameChangeHandler.bind(this);
    this.onSignupSubmitHandler = this.onSignupSubmitHandler.bind(this);
    this.updateLogInForm = this.updateLogInForm.bind(this);
  }

  // Handler to update state as user fills in sign-in form name
  onSignupNameChangeHandler(event) {
    const newState = Object.assign({}, this.state);
    newState.name = event.target.value;
    console.log(newState.name);
    this.setState(newState);
  }

  // Handler to update state as user fills in sign-in form role
  onSignupChangedHandler(event) {
    const newState = Object.assign({}, this.state);
    newState.role = event.currentTarget.value;
    console.log(newState.role);
    this.setState(newState);
  }

  // Upon Successful Log-In, set loggedIn to true, set logged in userid
  onLoginHandler(userid) {
    const newState = Object.assign({}, this.state);
    newState.loggedIn = true;
    newState.userid = userid;
    this.setState(newState);
  }

  // Upon Sign-Up, POST registration inputs and pass userID into Log-In Handler
  onSignupSubmitHandler() {
    const { name, role } = this.state;
    fetch('http://localhost:3000/createuser', {
      method: 'POST',
      body: JSON.stringify({
        name,
        role,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(data => data.json())
      .then(data => this.onLoginHandler(data.id))
      .then(() => this.fetchData())
      .catch(err => console.error(err));
  }

  // Handler to show registration form
  showForm(form) {
    this.setState({ formDisplay: form });
  }

  // Handler to show login form
  showRegistrationForm() {
    this.setState({ formDisplay: 'login' });
  }

  // Handler to update state if user fills in login form
  updateLogInForm(event) {
    const logInForm = this.state;
    const { email, password, remember } = logInForm;
    const newLogInForm = {
      email,
      password,
      remember,
    };
    newLogInForm[event.target.name] = event.target.value;
    this.setState({ logInForm: newLogInForm });
  }

  // PATCH updates to post database
  changeStatus(userId, postStatus, postId) {
    fetch('http://localhost:3000/status', {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({
        status: postStatus,
        postid: postId,
        userid: userId,
      }),
    })
      .then(() => this.fetchData())
      .catch(err => console.error(err));
  }

  // GET posts from database to show in front-end
  fetchData() {
    const notStarted = [];
    const inProgress = [];
    const closed = [];
    fetch('http://localhost:3000/home', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(posts => posts.json())
      .then((posts) => {
        posts.forEach((post) => {
          console.log(post);
          if (post.status === 'open') {
            notStarted.push(post);
          }
          if (post.status === 'claimed') {
            inProgress.push(post);
          }
          if (post.status === 'closed') {
            closed.push(post);
          }
        });
        const newState = Object.assign({}, this.state);
        newState.notStarted = notStarted;
        newState.inProgress = inProgress;
        newState.closed = closed;
        this.setState(newState);
      })
      .catch(err => console.error(err));
  }

  render() {
    const { name, notStarted, inProgress, closed, role, loggedIn, userid, logInForm } = this.state;
    const render = [];
    if (loggedIn) render.push(
      <div>
        <CreateSection userid = {userid} fetchData = {this.fetchData} />
        <PostSection changeStatus = {this.changeStatus} name={name} notStarted={notStarted} inProgress={inProgress} closed={closed} role={role} />
      </div>);
    return (
      <div className="app-container">
        <Header />
        <Main
          logInForm={logInForm}
          onSignupSubmitHandler={this.onSignupSubmitHandler}
          onSignupNameChangedHandler={this.onSignupNameChangeHandler}
          onSignupChangedHandler={this.onSignupChangedHandler}
          showForm={this.showForm}
          updateLogInForm={this.updateLogInForm}
        />
        {render}
      </div>
    );
  }
}

export default App;
