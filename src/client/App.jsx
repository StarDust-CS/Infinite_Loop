import React, { Component } from 'react';

import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

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

// Pre-LogIn Form Display (default: show page 1 of login form)
const defaultFormDisplay = {
  showForm: true,
  formName: 'login',
  formPage: 1,
};

// Default Filters
const defaultFilterConfig = {
  status: 'ALL',
  category: 'ALL',
};

// TODO: DELETE - Sample Tickets
const sampleTicket3 = {
  status: 'OPEN',
  ticketID: 3,
  title: 'Data Rendering in React',
  studentFullName: 'Joel Perkins',
  cohort: 24,
  createdAt: new Date(),
  fellowFullName: '',
  closedFullName: '',
  category: 'React/Redux',
  problem: 'trouble getting data to render on the page',
  expect: 'updating state with incoming data, using thunk to wait for the data. It console logs aftert it arrives however we are unsure if it is saving to the state',
  tried: 'google, console logging data..console logs come back as undefined',
  hypo: 'dispatch is not firing to update the store properly',
};

const sampleTicket2 = {
  status: 'IN PROGRESS',
  ticketID: 2,
  title: 'React Component Reuse',
  studentFullName: 'Ha-Rry Kim',
  cohort: 24,
  createdAt: new Date(),
  fellowFullName: 'Stephanie Fong',
  closedFullName: '',
  category: 'React/Redux',
  problem: 'Having trouble reusing same component for react',
  expect: 'Render on browser',
  tried: 'Make separate component to pass down the prop',
  hypo: 'It is not recognizing props?',
};

const sampleTicket1 = {
  status: 'CLOSED',
  ticketID: 1,
  title: 'Website Code Loading',
  studentFullName: 'Elliot Kim',
  cohort: 24,
  createdAt: new Date(),
  fellowFullName: 'Sam Goldberg',
  closedFullName: 'Sam Goldberg',
  category: 'JS Fundamentals',
  problem: 'Load our code onto webpage',
  expect: 'Code loading onto webpage',
  tried: 'Tried to research errors and also tried commenting out things to figure out why it is not loading',
  hypo: 'Because I am a WINNER (thanks Sam), just not this time',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInFormFields: blankLogInForm,
      registerFormFields: blankRegisterForm,
      ticketFormFields: blankTicketForm,
      userInfo: blankUser,
      ticketDisplay: [sampleTicket3, sampleTicket2, sampleTicket1],
      formDisplay: defaultFormDisplay,
      filterConfig: defaultFilterConfig,
    };

    this.showForm = this.showForm.bind(this);
    this.submitLogIn = this.submitLogIn.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.submitTicket = this.submitTicket.bind(this);
    this.updateFilterConfig = this.updateFilterConfig.bind(this);
    this.updateLogInForm = this.updateLogInForm.bind(this);
    this.updateRegisterForm = this.updateRegisterForm.bind(this);
    this.updateTicketForm = this.updateTicketForm.bind(this);
  }

  // Handler to show the login, registration, or ticket form
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

  // Handler for login form submission
  submitLogIn() {
    const { logInFormFields } = this.state;
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(logInFormFields),
    })
      .then(data => data.json())
      .then((data) => {
        console.log(data);
        const newUserInfo = { loggedIn: true };
        newUserInfo.firstName = data.first_name;
        newUserInfo.lastName = data.last_name;
        newUserInfo.role = data.role;
        newUserInfo.userID = data._id;
        const newFormDisplay = defaultFormDisplay;
        newFormDisplay.showForm = false;
        this.setState({
          formDisplay: newFormDisplay,
          logInFormFields: blankLogInForm,
          userInfo: newUserInfo,
        });
      })
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
        .then((data) => {
          const newUserInfo = { loggedIn: true };
          newUserInfo.firstName = data.firstName;
          newUserInfo.lastName = data.lastName;
          newUserInfo.role = data.role;
          newUserInfo.userID = data._id;
          const newFormDisplay = defaultFormDisplay;
          newFormDisplay.showForm = false;
          this.setState({
            formDisplay: newFormDisplay,
            logInFormFields: blankLogInForm,
            userInfo: newUserInfo,
          });
        })
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
      fetch('http://localhost:3000/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(ticketFormFields),
      })
        .then((data) => {
          const newFormDisplay = defaultFormDisplay;
          newFormDisplay.showForm = false;
          this.setState({ formDisplay: defaultFormDisplay, ticketFormFields: blankTicketForm });
        })
        .catch(err => console.error(err));
    }
  }

  // Handler to update Filter Configuration if user changes filters
  updateFilterConfig(event) {
    const { filterConfig } = this.state;
    const newFilterConfig = { ...filterConfig };
    newFilterConfig[event.target.name] = event.target.value;
    this.setState({ filterConfig: newFilterConfig });
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

  render() {
    const {
      filterConfig, formDisplay, userInfo, logInFormFields, registerFormFields, ticketFormFields, ticketDisplay,
    } = this.state;
    const { role } = userInfo;
    return (
      <div className="app-container">
        <Header
          userRole={role}
          showForm={this.showForm}
        />
        <Main
          filterConfig={filterConfig}
          formDisplay={formDisplay}
          logInFormFields={logInFormFields}
          registerFormFields={registerFormFields}
          ticketFormFields={ticketFormFields}
          ticketDisplay={ticketDisplay}
          userInfo={userInfo}
          showForm={this.showForm}
          submitLogIn={this.submitLogIn}
          submitRegister={this.submitRegister}
          submitTicket={this.submitTicket}
          updateFilterConfig={this.updateFilterConfig}
          updateLogInForm={this.updateLogInForm}
          updateRegisterForm={this.updateRegisterForm}
          updateTicketForm={this.updateTicketForm}
        />
      </div>
    );
  }
}

export default App;
