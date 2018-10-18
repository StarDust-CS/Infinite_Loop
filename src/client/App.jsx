import React, { Component } from 'react';

import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

// Import App Styling
import './App.css';

// Import and destructure default state for user and ticket forms
import defaultState from './defaultState';

const {
  blankLogInForm, blankRegisterForm, blankTicketForm,
  blankUser, defaultFormDisplay, defaultFilterConfig,
} = defaultState;

// TODO: DELETE - Sample Tickets
const sampleTicket5 = {
  status: 'OPEN',
  ticketID: 5,
  title: 'Events In Redux',
  studentFullName: 'Sam Ratemo',
  cohort: 24,
  createdAt: new Date(),
  fellowFullName: '',
  closedFullName: '',
  category: 'React/Redux',
  problem: 'Not able to use the event that I pass as a payload to change state. Also doesnt let me type to the form',
  expect: 'To be able to type and save the result to the state',
  tried: 'Googling and inspecting my code',
  hypo: 'Not using onchange react method?',
};

const sampleTicket4 = {
  status: 'OPEN',
  ticketID: 4,
  title: 'Redux Null Error',
  studentFullName: 'Sam Ratemo',
  cohort: 24,
  createdAt: new Date(),
  fellowFullName: '',
  closedFullName: '',
  category: 'React/Redux',
  problem: 'Getting an \'null\' error why I try to pass data down from the state',
  expect: 'I expect to render a component',
  tried: 'Tried looking at my reducers and how im defining the state. I cant quite tell why im getting a null error',
  hypo: 'I probably need to change something in the reducers',
};

const sampleTicket3 = {
  status: 'IN PROGRESS',
  ticketID: 3,
  title: 'Data Rendering in React',
  studentFullName: 'Joel Perkins',
  cohort: 24,
  createdAt: new Date(),
  fellowFullName: 'Colin McCarthy',
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
      ticketDisplay: [sampleTicket5, sampleTicket4, sampleTicket3, sampleTicket2, sampleTicket1],
      formDisplay: defaultFormDisplay,
      filterConfig: defaultFilterConfig,
    };

    this.fetchTickets = this.fetchTickets.bind(this);
    this.showForm = this.showForm.bind(this);
    this.submitLogIn = this.submitLogIn.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.submitTicket = this.submitTicket.bind(this);
    this.updateFilterConfig = this.updateFilterConfig.bind(this);
    this.updateLogInForm = this.updateLogInForm.bind(this);
    this.updateRegisterForm = this.updateRegisterForm.bind(this);
    this.updateTicketForm = this.updateTicketForm.bind(this);
    this.updateTicket = this.updateTicket.bind(this);
  }

  // Handler to fetch tickets and populate ticketDisplay
  fetchTickets() {
    const newTicketDisplay = [sampleTicket5, sampleTicket4, sampleTicket3, sampleTicket2, sampleTicket1];
    fetch('/ticket')
      .then(data => data.json())
      .then((data) => {
        data.forEach((ticket) => {
          ticket.status = ticket.status.toUpperCase();
          ticket.createdAt = new Date(ticket.createdAt);
          newTicketDisplay.unshift(ticket);
        });
        this.setState({ ticketDisplay: newTicketDisplay });
      })
      .catch(err => console.error(err));
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
        const newUserInfo = { loggedIn: true };
        newUserInfo.firstName = data.first_name;
        newUserInfo.lastName = data.last_name;
        newUserInfo.role = data.role;
        newUserInfo.userID = data._id;
        const newFormDisplay = defaultFormDisplay;
        newFormDisplay.showForm = false;
        this.fetchTickets();
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
          newUserInfo.firstName = data.first_name;
          newUserInfo.lastName = data.last_name;
          newUserInfo.role = data.role;
          newUserInfo.userID = data._id;
          const newFormDisplay = defaultFormDisplay;
          newFormDisplay.showForm = false;
          this.fetchTickets();
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
        .then((data) => data.json())
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

  updateTicket(status, ticketID, userID) {
    const sendObj = {};
    if (status === 'CLOSED') {
      sendObj.status = status;
      sendObj.ticketID = ticketID;
      sendObj.userID = userID;
    }
    fetch('http://localhost:3000/ticket', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(sendObj),
    })
      .then((data) => data.json())
      .then((data) => {
        this.fetchTickets();
        const newFormDisplay = defaultFormDisplay;
        newFormDisplay.showForm = false;
        this.setState({ formDisplay: defaultFormDisplay, ticketFormFields: blankTicketForm });
      })
      .catch(err => console.error(err));
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
          updateTicket={this.updateTicket}
        />
      </div>
    );
  }
}

export default App;
