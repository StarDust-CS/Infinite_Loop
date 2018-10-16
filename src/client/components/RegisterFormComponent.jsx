import PropTypes from 'prop-types';
import React from 'react';

const RegisterFormComponent = (props) => {
  const { formPage, registerFormFields, showForm, submitRegister, updateRegisterForm } = props;
  let headerMessage = 'Please Sign Up';
  const registerFormDisplay = [];
  const cohortList = [];
  cohortList.push(<option value={0} disabled selected>COHORT</option>);
  for (let i = 24; i > 0; i -= 1) {
    cohortList.push(<option value={i}>{i}</option>);
  }
  if (formPage === 1) {
    registerFormDisplay.push(
      <div className="main-form-field-rc-container">
        <select className="main-form-field-cohort" name="cohort" onChange={updateRegisterForm} value={registerFormFields.cohort}>
          {cohortList}
        </select>
        <select className="main-form-field-role" name="role" onChange={updateRegisterForm} value={registerFormFields.role}>
          <option value="" disabled selected>ROLE</option>
          <option value="Student">Student</option>
          <option value="Fellow">Fellow</option>
          <option value="Admin">Admin</option>
        </select>
      </div>,
    );
    registerFormDisplay.push(<input className="main-form-field" name="firstName" onChange={updateRegisterForm} placeholder="FIRST NAME" type="text" value={registerFormFields.firstName} />);
    registerFormDisplay.push(<input className="main-form-field" name="lastName" onChange={updateRegisterForm} placeholder="LAST NAME" type="text" value={registerFormFields.lastName} />);
    registerFormDisplay.push(<input className="main-form-button" onClick={submitRegister} type="submit" value="Continue" />);
  } else if (formPage === 2) {
    headerMessage = `Welcome ${registerFormFields.firstName}`;
    registerFormDisplay.push(<input className="main-form-field" name="email" onChange={updateRegisterForm} placeholder="EMAIL" type="text" value={registerFormFields.email} />);
    registerFormDisplay.push(<input className="main-form-field" name="password" onChange={updateRegisterForm} placeholder="PASSWORD" type="password" value={registerFormFields.password} />);
    registerFormDisplay.push(<input className="main-form-field" name="code" onChange={updateRegisterForm} placeholder="SECRET CODE" type="password" value={registerFormFields.code} />);
    registerFormDisplay.push(<input className="main-form-button" onClick={submitRegister} type="submit" value="Submit" />);
  }
  registerFormDisplay.push(<button className="main-login-register" onClick={showForm} type="button" value="login">Log In</button>);
  return (
    <div className="main-form-container">
      <div className="main-form-header">
        {headerMessage}
      </div>
      <div className="main-login-body">
        {registerFormDisplay}
      </div>
    </div>
  );
};

RegisterFormComponent.propTypes = {
  formPage: PropTypes.number.isRequired,
  registerFormFields: PropTypes.objectOf.isRequired,
  showForm: PropTypes.func.isRequired,
  submitRegister: PropTypes.func.isRequired,
  updateRegisterForm: PropTypes.func.isRequired,
};

export default RegisterFormComponent;
