import PropTypes from 'prop-types';
import React from 'react';

import LogInFormComponent from './LogInFormComponent.jsx';
import RegisterFormComponent from './RegisterFormComponent.jsx';
import TicketFormComponent from './TicketFormComponent.jsx';
import TicketComponent from './TicketComponent.jsx';

const Main = (props) => {
  const {
    formDisplay, ticketDisplay, userInfo,
    logInFormFields, registerFormFields, ticketFormFields,
    showForm, submitLogIn, submitRegister, submitTicket,
    updateLogInForm, updateRegisterForm, updateTicketForm,
  } = props;
  const display = [];
  if (formDisplay.showForm && formDisplay.formName === 'login') {
    display.push(<LogInFormComponent
      logInFormFields={logInFormFields}
      showForm={showForm}
      submitLogIn={submitLogIn}
      updateLogInForm={updateLogInForm}
    />);
  } else if (formDisplay.showForm && formDisplay.formName === 'register') {
    display.push(<RegisterFormComponent
      formDisplay={formDisplay}
      registerFormFields={registerFormFields}
      showForm={showForm}
      submitRegister={submitRegister}
      updateRegisterForm={updateRegisterForm}
    />);
  } else if (formDisplay.showForm && formDisplay.formName === 'ticket') {
    display.push(<TicketFormComponent
      formDisplay={formDisplay}
      showForm={showForm}
      submitTicket={submitTicket}
      ticketFormFields={ticketFormFields}
      userInfo={userInfo}
      updateTicketForm={updateTicketForm}
    />);
  } else if (!formDisplay.showForm) {
    ticketDisplay.forEach((ticket) => {
      display.push(<TicketComponent ticket={ticket} />);
    });
  }
  return (
    <main>
      {display}
    </main>
  );
};

Main.propTypes = {
  showForm: PropTypes.func.isRequired,
  submitLogIn: PropTypes.func.isRequired,
  submitRegister: PropTypes.func.isRequired,
  submitTicket: PropTypes.func.isRequired,
  updateLogInForm: PropTypes.func.isRequired,
  updateRegisterForm: PropTypes.func.isRequired,
  updateTicketForm: PropTypes.func.isRequired,
};

export default Main;