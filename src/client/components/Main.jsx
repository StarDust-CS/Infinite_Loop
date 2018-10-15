import React from 'react';

import Signup from './Signup.jsx';

const Main = (props) => {
  const { logInForm, onSignupSubmitHandler, onSignupNameChangeHandler, onSignupChangedHandler, updateLogInForm } = props;
  return (
    <main>
      <Signup
        logInForm={logInForm}
        onSignupSubmitHandler={onSignupSubmitHandler}
        onSignupNameChangedHandler={onSignupNameChangeHandler}
        onSignupChangedHandler={onSignupChangedHandler}
        updateLogInForm={updateLogInForm}
      />
    </main>
  );
};

export default Main;
