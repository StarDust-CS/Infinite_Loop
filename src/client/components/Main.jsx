import React from 'react';

import LogInFormComponent from './LogInFormComponent.jsx';
import RegisterFormComponent from './RegisterFormComponent.jsx';
import TicketFormComponent from './TicketFormComponent.jsx';

const Main = (props) => {
  const {
    formDisplay, logInFormFields, onSignupSubmitHandler, onSignupNameChangeHandler, onSignupChangedHandler, registerFormFields, showForm,
    submitLogIn, submitRegister, submitTicket,
    ticketFormFields,
    updateLogInForm, updateRegisterForm, updateTicketForm,
    userInfo
  } = props;
  const display = [];
  if (formDisplay.formName === 'login') {
    display.push(<LogInFormComponent
      logInFormFields={logInFormFields}
      showForm={showForm}
      submitLogIn={submitLogIn}
      updateLogInForm={updateLogInForm}
    />);
  } else if (formDisplay.formName === 'register') {
    display.push(<RegisterFormComponent
      formDisplay={formDisplay}
      registerFormFields={registerFormFields}
      showForm={showForm}
      submitRegister={submitRegister}
      updateRegisterForm={updateRegisterForm}
    />);
  } else if (formDisplay.formName === 'ticket') {
    display.push(<TicketFormComponent
      formDisplay={formDisplay}
      showForm={showForm}
      submitTicket={submitTicket}
      ticketFormFields={ticketFormFields}
      userInfo={userInfo}
      updateTicketForm={updateTicketForm}
    />);
  }
  return (
    <main>
      {display}
    </main>
  );
};

export default Main;
