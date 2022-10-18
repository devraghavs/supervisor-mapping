import React from "react";
import "./header.css";
import constants from "../../../constants/index";
/** @description:- Function for Header component*/
const Header = () => {
  const { appHeading } = constants;

  const { supervisorHeading } = appHeading;
  return (
    <div>
      <header id="header" className="app-header">
        <div className="ps-logo"></div>
        <div className="app-heading">
          <h5 className="app-heading-content">{supervisorHeading}</h5>
        </div>
      </header>
    </div>
  );
};

export default Header;
