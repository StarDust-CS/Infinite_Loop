import PropTypes from 'prop-types';
import React from 'react';

import csLogoURL from '../../../images/codesmith-logo.svg';

const Header = (props) => {
  const { showForm, userRole } = props;
  const button = [];
  if (userRole === 'Student') {
    button.push(
      <div className="header-add-ticket-button-container">
        <button className="header-add-ticket-button" onClick={showForm} type="button" value="ticket">+</button>
      </div>,
    );
  }
  return (
    <header>
      <div className="header-cs-logo-container">
        <img className="header-cs-logo-img" src={csLogoURL} alt="CodeSmith Logo" />
        <span className="header-cs-logo-break">|</span>
        <span className="header-cs-logo-text">Help Desk</span>
      </div>
      {button}
    </header>
  );
};

Header.propTypes = {
  showForm: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default Header;
