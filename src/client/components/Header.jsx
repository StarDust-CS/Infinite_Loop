import React from 'react';

import csLogoURL from "../../../images/codesmith-logo.svg";

const Header = () => {
  return (
    <header>
      <img className="header-cs-logo-img" src={csLogoURL} alt="CodeSmith Logo" />
      <span className="header-cs-logo-break">|</span>
      <span className="header-cs-logo-text">Help Desk</span>
    </header>
  );
};

export default Header;
