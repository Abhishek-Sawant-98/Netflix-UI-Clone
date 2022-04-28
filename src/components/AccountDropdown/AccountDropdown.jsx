import React, { useRef } from "react";
import "./AccountDropdown.css";

const AccountDropdown = ({ showDropdown, updateShowDropdown }) => {
  const dropdownDiv = useRef();
  return (
    <div
      onMouseLeave={() => updateShowDropdown(false)}
      onMouseEnter={() => {
        updateShowDropdown(true);
        // dropdownDiv.current.style.opacity = "1";
      }}
    >
      {
        <div
          className="accountDropdown  me-lg-4"
          id={`${
            showDropdown === null
              ? "hideDropdown"
              : showDropdown === true
              ? "appear"
              : "disappear"
          }`}
          ref={dropdownDiv}
        >
          <i className="bi bi-caret-up-fill"></i>
          <div style={{ paddingBottom: "0px" }}>
            <img id="img_kids" src="../../img_kids.png" alt="img_kids" />
            Children
          </div>
          <div>
            <i className="menu-icon bi bi-pencil"></i> Manage Profiles
          </div>
          <div className="bordered top-bottom-border">Children</div>
          <div style={{ paddingBottom: "0px" }}>
            <i className="menu-icon bi bi-person"></i>
            Account
          </div>
          <div style={{ paddingTop: "5px" }}>
            <i className="menu-icon bi bi-question-circle"></i>
            Help Centre
          </div>
          <div className="justify-content-center bordered top-border">
            Sign out of Netflix
          </div>
        </div>
      }
    </div>
  );
};

export default AccountDropdown;
