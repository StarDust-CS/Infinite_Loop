import PropTypes from 'prop-types';
import React from 'react';

const TicketFormComponent = (props) => {
  const { formDisplay, submitTicket, ticketFormFields, updateTicketForm, userInfo, } = props;
  const { createdAt, studentID, category, title, problem, expect, tried, hypo } = ticketFormFields;
  const { firstName, lastName, role, userID, } = userInfo;
  const ticketFormDisplay = [];
  
  if (formDisplay.formPage === 1) {
    ticketFormDisplay.push(<span className="main-ticket-span-title">Student Name: {firstName} {lastName}</span>);
    ticketFormDisplay.push(<span className="main-ticket-span-title">Ticket Date: {new Date().toDateString()} </span>);
    ticketFormDisplay.push(<span className="main-ticket-span-title">Ticket Time: {new Date().toLocaleTimeString('en-US')} </span>);
    ticketFormDisplay.push(
      <select className="main-form-field" name="category" onChange={updateTicketForm} value={category}>
        <option value="" disabled>CATEGORY</option>
        <option value="JS Fundamentals">JS Fundamentals</option>
        <option value="Data/Algorithms">Data/Algorithms</option>
        <option value="React/Redux">React/Redux</option>
        <option value="Node/Express">Node/Express</option>
        <option value="Databases">Databases</option>
        <option value="Authentication">Authentication</option>
        <option value="Testing">Testing</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>,
    );
    ticketFormDisplay.push(<input className="main-form-field" maxLength="60" name="title" onChange={updateTicketForm} placeholder="TITLE (max 60 characters)" type="text" value={title} />);
    ticketFormDisplay.push(<input className="main-form-button" onClick={submitTicket} type="submit" value="Continue" />);
  } else if (formDisplay.formPage === 2) {
    ticketFormDisplay.push(<span className="main-ticket-span-title">Page 2: My Problem</span>);
    ticketFormDisplay.push(<textarea className="main-form-textarea" maxLength="180" name="problem" onChange={updateTicketForm} placeholder="What problem are you experiencing?" value={problem} />);
    ticketFormDisplay.push(<input className="main-form-button" onClick={submitTicket} type="submit" value="Continue" />);
  } else if (formDisplay.formPage === 3) {
    ticketFormDisplay.push(<span className="main-ticket-span-title">Page 3: What I Expect To Happen</span>);
    ticketFormDisplay.push(<textarea className="main-form-textarea" maxLength="180" name="expect" onChange={updateTicketForm} placeholder="What do you expect to happen?" value={expect} />);
    ticketFormDisplay.push(<input className="main-form-button" onClick={submitTicket} type="submit" value="Continue" />);
  } else if (formDisplay.formPage === 4) {
    ticketFormDisplay.push(<span className="main-ticket-span-title">Page 4: What I Have Tried</span>);
    ticketFormDisplay.push(<textarea className="main-form-textarea" maxLength="180" name="tried" onChange={updateTicketForm} placeholder="What have you already tried?" value={tried} />);
    ticketFormDisplay.push(<input className="main-form-button" onClick={submitTicket} type="submit" value="Continue" />);
  } else if (formDisplay.formPage === 5) {
    ticketFormDisplay.push(<span className="main-ticket-span-title">Page 5: Why It Is Not Working</span>);
    ticketFormDisplay.push(<textarea className="main-form-textarea" maxLength="180" name="hypo" onChange={updateTicketForm} placeholder="What is your hypothesis for why your solution isn't working?" value={hypo} />);
    ticketFormDisplay.push(<input className="main-form-button" onClick={submitTicket} type="submit" value="Submit" />);
  }
  return (
    <div className="main-form-container">
      <div className="main-form-header">
        Enter Your Ticket
      </div>
      <div className="main-login-body">
        {ticketFormDisplay}
        <div className="main-form-buffer" />
      </div>
    </div>
  );
};

TicketFormComponent.propTypes = {
  showForm: PropTypes.func.isRequired,
  ticketFormFields: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date).isRequired,
    studentID: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    problem: PropTypes.string.isRequired,
    expect: PropTypes.string.isRequired,
    tried: PropTypes.string.isRequired,
    hypo: PropTypes.string.isRequired,
  }).isRequired,
};

export default TicketFormComponent;