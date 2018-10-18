import React from 'React';
import PropTypes from 'prop-types';

const TicketComponent = (props) => {
  const { ticket, userInfo, updateTicket } = props;
  const {
    ticketID, createdAt, cohort, studentFullName, fellowFullName, closedFullName, status, category,
    title, problem, expect, tried, hypo,
  } = ticket;
  const fellow = [];
  const buttons = [];
  const ticketHeader = [];
  if (status === 'OPEN') {
    ticketHeader.push(
      <div className="main-ticket-header open-ticket-header">
        <span className="main-ticket-header-text">
          TICKET #
          {ticketID}
        </span>
        <span className="main-ticket-header-text">
          STATUS:
          {` ${status}`}
        </span>
      </div>,
    );
    ticketHeader.push(
      <div className="main-ticket-title open-ticket-title">
        <span>{title}</span>
      </div>,
    );
    ticketHeader.push(
      <div className="main-ticket-author open-ticket-author">
        <span className="main-ticket-author-text">Student: {studentFullName} (Cohort {cohort})</span>
      </div>,
    );
    fellow.push(
      <div className="main-ticket-footer">
        <span className="main-ticket-footer-text">Fellow: NOT YET CLAIMED</span>
      </div>,
    );
  }
  if (status === 'IN PROGRESS') {
    ticketHeader.push(
      <div className="main-ticket-header in-progress-ticket-header">
        <span className="main-ticket-header-text">
          TICKET #
          {ticketID}
        </span>
        <span className="main-ticket-header-text">
          STATUS:
          {` ${status}`}
        </span>
      </div>,
    );
    ticketHeader.push(
      <div className="main-ticket-title in-progress-ticket-title">
        <span>{title}</span>
      </div>,
    );
    ticketHeader.push(
      <div className="main-ticket-author in-progress-ticket-author">
        <span className="main-ticket-author-text">Student: {studentFullName} (Cohort {cohort})</span>
      </div>,
    );
    fellow.push(
      <div className="main-ticket-footer">
        <span className="main-ticket-footer-text">Fellow: {fellowFullName}</span>
      </div>,
    );
  }
  if (status === 'CLOSED') {
    ticketHeader.push(
      <div className="main-ticket-header closed-ticket-header">
        <span className="main-ticket-header-text">
          TICKET #
          {ticketID}
        </span>
        <span className="main-ticket-header-text">
          STATUS:
          {` ${status}`}
        </span>
      </div>,
    );
    ticketHeader.push(
      <div className="main-ticket-title closed-ticket-title">
        <span>{title}</span>
      </div>,
    );
    ticketHeader.push(
      <div className="main-ticket-author closed-ticket-author">
        <span className="main-ticket-author-text">Student: {studentFullName} (Cohort {cohort})</span>
      </div>,
    );
    fellow.push(
      <div className="main-ticket-footer">
        <span className="main-ticket-footer-text">Closed By: {closedFullName}</span>
      </div>,
    );
  }

  buttons.push(
    <button className="main-ticket-button" type="button">
      EDIT
    </button>,
  );

  if (userInfo.role === 'Student') {
    buttons.push(
      <button className="main-ticket-button" onClick={() => updateTicket('CLOSED', ticketID, userInfo.userID)} type="button">
        CLOSE
      </button>,
    );
  } else if (userInfo.role === 'Fellow') {
    buttons.push(
      <button className="main-ticket-button" onClick={() => updateTicket('IN PROGRESS', ticketID, userInfo.userID)} type="button">
        CLAIM
      </button>,
    );
  }

  return (
    <div className="main-ticket-container">
      {ticketHeader}
      <div className="main-ticket-body-title">
        Category: {category}
      </div>
      <div className="main-ticket-body-title">
        My Problem
      </div>
      <div className="main-ticket-body">
        {problem}
      </div>
      <div className="main-ticket-body-title">
        What I Expect:
      </div>
      <div className="main-ticket-body">
        {expect}
      </div>
      <div className="main-ticket-body-title">
        What I Have Tried:
      </div>
      <div className="main-ticket-body">
        {tried}
      </div>
      <div className="main-ticket-body-title">
        Why It Does Not Work:
      </div>
      <div className="main-ticket-body">
        {hypo}
      </div>

      <div className="main-ticket-button-container">
        {buttons}
      </div>

      {fellow}
      
      <div className="main-ticket-date-footer">
        <span className="main-ticket-footer-text">Date: {createdAt.toDateString()}</span>
        <span className="main-ticket-footer-text">Time: {createdAt.toLocaleTimeString('en-US')}</span>
      </div>

    </div>
  );
};

TicketComponent.propTypes = {
  ticket: PropTypes.shape({
    status: PropTypes.string.isRequired,
    ticketID: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date),
    studentFullName: PropTypes.string.isRequired,
    fellowFullName: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    problem: PropTypes.string.isRequired,
    expect: PropTypes.string.isRequired,
    tried: PropTypes.string.isRequired,
    hypo: PropTypes.string.isRequired,
  }).isRequired,
  userInfo: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    userID: PropTypes.number.isRequired,
  }).isRequired,
  updateTicket: PropTypes.func.isRequired,
};

export default TicketComponent;
