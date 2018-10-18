import React, { Component } from 'react';
import * as forms from './forms';

import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

import { connect } from 'react-redux'

import * as userActions from './actions/userActions';
import * as formActions from './actions/formsActions';


import './App.css';


const mapStateToProps = store => ({
  logInFormFields: store.forms.logInFormFields, 
  registerFormFields: store.forms.registerFormFields, 
  ticketFormFields: store.forms.ticketFormFields, 
  userInfo: store.users.userInfo,
  ticketDisplay: store.forms.ticketDisplay,
  formDisplay: store.forms.formDisplay
  
});

const mapDispatchToProps = dispatch => ({
  // create functions that will dispatch action creators
   submitLogIn: (logInFormFields) => {
    dispatch(userActions.logIn(logInFormFields));
  },
  showForm: (event) => {
    dispatch(formActions.showForm(event));
  },
  updateLogInForm: (event) => {
    dispatch(formActions.updateLogInForm(event));
  }, 
  submitRegister: (event, registerFormFields) => {
    event.preventDefault();
    dispatch(userActions.register(event, registerFormFields));
  },
  updateRegisterForm: (event) => {
    dispatch(formActions.updateRegisterForm(event));
  },
  submitTicket: (event) => { 
    dispatch(formsActions.submitTicket(event))
  },
  updateTicketForm: (event) => {
    dispatch(formActions.updateTicketForm(event));
  }, 
  
});

class App extends Component {
  constructor(props) {
    super(props);

  
  }
  render() {
    console.log(forms.logInFormFields)
    const { formDisplay, userInfo, logInFormFields, registerFormFields, ticketFormFields, ticketDisplay, } = this.props;
   
    return (
      <div className="app-container">
        <Header
          showForm={this.props.showForm}
        />
        <Main
          formDisplay={formDisplay}
          logInFormFields={logInFormFields}
          registerFormFields={registerFormFields}
          ticketFormFields={ticketFormFields}
          ticketDisplay={ticketDisplay}
          userInfo={userInfo}
          showForm={this.props.showForm}
          submitLogIn={this.props.submitLogIn}
          submitRegister={this.props.submitRegister}
          submitTicket={this.props.submitTicket}
          updateLogInForm={this.props.updateLogInForm}
          updateRegisterForm={this.props.updateRegisterForm}
          updateTicketForm={this.props.updateTicketForm}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);