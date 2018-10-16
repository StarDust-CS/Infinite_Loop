import React, { Component } from 'react';

import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

import PostSection from './components/PostSection.jsx';
import CreateSection from './components/CreateSection.jsx';

// Import App Styling
import './App.css';

// Blank LogIn Form
const blankLogInForm = {
  email: '',
  password: '',
  remember: true,
};

// Blank Registration Form
const blankRegisterForm = {
  cohort: 0,
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  code: '',
};

// Blank Ticket Form
const blankTicketForm = {
  createdAt: Date.now(),
  studentID: 0,
  status: 'Open',
  category: '',
  title: '',
  problem: '',
  expect: '',
  tried: '',
  hypo: '',
};

// Pre-LogIn Blank User
const blankUser = {
  loggedIn: false,
  firstName: '',
  lastName: '',
  role: '',
  userID: 0,
};

// Pre-LogIn Blank Ticket Array
const blankTicketDisplay = {
  notStarted: [],
  inProgress: [],
  closed: [],
};

// Pre-LogIn Form Display (default: show page 1 of login form)
const defaultFormDisplay = {
  showForm: true,
  formName: 'login',
  formPage: 1,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInFormFields: blankLogInForm,
      registerFormFields: blankRegisterForm,
      ticketFormFields: blankTicketForm,
      userInfo: blankUser,
      ticketDisplay: blankTicketDisplay,
      formDisplay: defaultFormDisplay,
    };

    this.changeStatus = this.changeStatus.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.showForm = this.showForm.bind(this);
    this.onLoginHandler = this.onLoginHandler.bind(this);
    this.onSignupChangedHandler = this.onSignupChangedHandler.bind(this);
    this.onSignupSubmitHandler = this.onSignupSubmitHandler.bind(this);
    this.submitLogIn = this.submitLogIn.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.submitTicket = this.submitTicket.bind(this);
    this.updateLogInForm = this.updateLogInForm.bind(this);
    this.updateRegisterForm = this.updateRegisterForm.bind(this);
    this.updateTicketForm = this.updateTicketForm.bind(this);
  }

  // Handler to update state as user fills in sign-in form role
  onSignupChangedHandler(event) {
    const newState = Object.assign({}, this.state);
    newState.role = event.currentTarget.value;
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

  // Handler for login form submission
  submitLogIn() {
    const { logInFormFields } = this.state;
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(logInFormFields),
    })
      .then(data => data.json())
      .then(data => console.log(data))
      .then(data => this.setState({
        formDisplay: defaultFormDisplay,
        logInFormFields: blankLogInForm,
      }))
      .catch(err => console.error(err));
  }

  // Handler for registraiton form submission
  submitRegister(event) {
    const { formDisplay } = this.state;
    if (event.target.value === 'Continue') {
      const newFormDisplay = { ...formDisplay };
      newFormDisplay.formPage += 1;
      this.setState({ formDisplay: newFormDisplay });
    } else if (event.target.value === 'Submit') {
      const { registerFormFields } = this.state;
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(registerFormFields),
      })
        .then(data => data.json())
        .then(data => console.log(data))
        .then(data => this.setState({ formDisplay: defaultFormDisplay }))
        .catch(err => console.error(err));
    }
  }

  submitTicket(event) {
    const { formDisplay, ticketFormFields } = this.state;
    console.log(ticketFormFields);
    if (event.target.value === 'Continue') {
      const newFormDisplay = { ...formDisplay };
      const newFormFields = { ...ticketFormFields };
      newFormDisplay.formPage += 1;
      newFormFields.createdAt = Date.now();
      this.setState({ formDisplay: newFormDisplay, ticketFormFields: newFormFields });
    } else if (event.target.value === 'Submit') {
      this.setState({ formDisplay: defaultFormDisplay, ticketFormFields: blankTicketForm });
    }
  }

  // Handler to show registration form
  showForm(event) {
    const { ticketFormFields, userInfo } = this.state;
    const newTicketFormFields = { ...ticketFormFields };
    const newFormDisplay = {
      showForm: true,
      formName: event.target.value,
      formPage: 1,
    };
    if (event.target.value === 'ticket') {
      newTicketFormFields.studentID = userInfo.userID;
    }
    this.setState({
      formDisplay: newFormDisplay,
      ticketFormFields: newTicketFormFields,
    });
  }

  // Handler to update state if user fills in login form
  updateLogInForm(event) {
    const { logInFormFields } = this.state;
    const newLogInFormFields = { ...logInFormFields };
    if (event.target.name === 'remember') {
      newLogInFormFields[event.target.name] = event.target.checked;
    } else {
      newLogInFormFields[event.target.name] = event.target.value;
    }
    this.setState({ logInFormFields: newLogInFormFields });
  }

  updateRegisterForm(event) {
    const { registerFormFields } = this.state;
    const newRegisterFormFields = { ...registerFormFields };
    if (event.target.name === 'cohort') {
      newRegisterFormFields[event.target.name] = Number(event.target.value);
    } else {
      newRegisterFormFields[event.target.name] = event.target.value;
    }
    this.setState({ registerFormFields: newRegisterFormFields });
  }

  updateTicketForm(event) {
    const { ticketFormFields } = this.state;
    const newTicketFormFields = { ...ticketFormFields };
    newTicketFormFields[event.target.name] = event.target.value;
    this.setState({ ticketFormFields: newTicketFormFields });
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
    const {
      name, notStarted, formDisplay, inProgress, closed, role, loggedIn, userInfo, logInFormFields, registerFormFields, formPage, ticketFormFields,
    } = this.state;
    const render = [];
    if (loggedIn) render.push(
      <div>
        <CreateSection userid={userid} fetchData={this.fetchData} />
        <PostSection changeStatus={this.changeStatus} name={name} notStarted={notStarted} inProgress={inProgress} closed={closed} role={role} />
      </div>);
    return (
      <div className="app-container">
        <Header
          showForm={this.showForm}
        />
        <Main
          formDisplay={formDisplay}
          logInFormFields={logInFormFields}
          registerFormFields={registerFormFields}
          ticketFormFields={ticketFormFields}
          userInfo={userInfo}
          showForm={this.showForm}
          submitLogIn={this.submitLogIn}
          submitRegister={this.submitRegister}
          submitTicket={this.submitTicket}
          updateLogInForm={this.updateLogInForm}
          updateRegisterForm={this.updateRegisterForm}
          updateTicketForm={this.updateTicketForm}
        />
        {render}
      </div>
    );
  }
}

export default App;
