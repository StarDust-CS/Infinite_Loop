import React from 'react';

const Signup = (props) => {
  const { logInForm, onSignupNameChangedHandler, updateLogInForm } = props;
  return (
    <div className="main-login-container">
      <div className="main-login-header">
        Please Log In
      </div>

      <div className="main-login-body">
        <input className="main-login-field" name="email" onChange={updateLogInForm} placeholder="E-MAIL" type="text" value={logInForm.email} />
        <input className="main-login-field" name="password" onChange={updateLogInForm} placeholder="PASSWORD" type="password" value={logInForm.password} />
        <div className="main-login-remember-container">
          <input className="main-login-check" checked={logInForm.remember} onChange={updateLogInForm} type="checkbox"  />
          <span className="main-login-remember">Remember Me</span>
        </div>
        <input className="main-login-button" type="submit" value="Log In" />
        <span className="main-login-forgot-pass">Forgot your password?</span>
        <span className="main-login-register" onClick={() => showForm('register')}>Create an Account</span>

        {/* <label>User: </label><input onChange = {props.onSignupNameChangedHandler} type="text" placeholder="First Name"/>
        
        <div>
          <label>Choose your role: </label><select defaultValue="" onChange={props.onSignupChangedHandler}>
            <option value="" disabled>Select your role</option>
            <option value='student'>Student</option>
            <option value='helper'>Helper</option>
          </select>
        </div>

        <div>
          <button type="submit" onClick={props.onSignupSubmitHandler}>Submit</button>
        </div> */}

      </div>
    </div>
  );
};
export default Signup;
