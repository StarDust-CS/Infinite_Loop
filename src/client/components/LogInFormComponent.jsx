import PropTypes from 'prop-types';
import React from 'react';

const LogInFormComponent = (props) => {
  const { logInFormFields, showForm, updateLogInForm } = props;
  return (
    <div className="main-form-container">
      <div className="main-form-header">
        Please Log In
      </div>
      <div className="main-login-body">
        <input className="main-form-field" name="email" onChange={updateLogInForm} placeholder="E-MAIL" type="text" value={logInFormFields.email} />
        <input className="main-form-field" name="password" onChange={updateLogInForm} placeholder="PASSWORD" type="password" value={logInFormFields.password} />
        <div className="main-login-remember-container">
          <input className="main-login-check" checked={logInFormFields.remember} onChange={updateLogInForm} type="checkbox" />
          <span className="main-login-remember">Remember Me</span>
        </div>
        <input className="main-form-button" type="submit" value="Log In" />
        <span className="main-login-forgot-pass">Forgot your password?</span>
        <button className="main-login-register" onClick={showForm} type="button" value="register">Create an Account</button>
      </div>
    </div>
  );
};

LogInFormComponent.propTypes = {
  logInFormFields: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    remember: PropTypes.bool.isRequired,
  }).isRequired,
  showForm: PropTypes.func.isRequired,
  updateLogInForm: PropTypes.func.isRequired,
};

export default LogInFormComponent;
