import React from 'react';

import LogInFormComponent from './LogInFormComponent.jsx';
import RegisterFormComponent from './RegisterFormComponent.jsx';
import Signup from './Signup.jsx';

const Main = (props) => {
  const { formDisplay, formPage, logInFormFields, onSignupSubmitHandler, onSignupNameChangeHandler, onSignupChangedHandler, registerFormFields, showForm, submitRegister, updateLogInForm, updateRegisterForm } = props;
  const display = [];
  if (formDisplay === 'login') {
    display.push(<LogInFormComponent
      logInFormFields={logInFormFields}
      showForm={showForm}
      updateLogInForm={updateLogInForm}
    />);
  } else if (formDisplay === 'register') {
    display.push(<RegisterFormComponent
      formPage={formPage}
      registerFormFields={registerFormFields}
      showForm={showForm}
      submitRegister={submitRegister}
      updateRegisterForm={updateRegisterForm}
    />);
  }
  return (
    <main>
      {display}
    </main>
  );
};

export default Main;
