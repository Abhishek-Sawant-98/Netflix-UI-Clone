import React from "react";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <div className="navigation">
      <img
        id="netflix-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158"
        alt="netflix-logo"
      />
      <img
        id="user-avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
        alt="user-avatar"
      />
    </div>
  );
};

export default Navbar;
