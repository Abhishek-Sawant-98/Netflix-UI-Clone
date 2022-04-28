import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import AccountDropdown from "../AccountDropdown/AccountDropdown";
import NavMenu from "../NavMenu/NavMenu";

const Navbar = () => {
  const [showHeaderbg, setShowHeaderbg] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const menuDropdownIcon = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowHeaderbg(window.scrollY > 20);
    });
  }, []);

  useEffect(() => {
    menuDropdownIcon.current.style.transform = `rotateZ(${
      showAccountDropdown ? "180" : "0"
    }deg)`;
    menuDropdownIcon.current.style.transition = `transform 0.2s ease ${
      !showAccountDropdown ? "0.5s" : ""
    }`;
  }, [showAccountDropdown]);

  return (
    <div
      className="navigation"
      style={{
        backgroundColor: `${showHeaderbg ? "#141417" : "transparent"}`,
      }}
    >
      <img
        id="netflix-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158"
        alt="netflix-logo"
      />
      {/* Navbar Menu */}
      <NavMenu />

      <span className="right-side-icons me-lg-4">
        <i className="bi bi-search  me-lg-4"></i>
        <span className="kids d-none d-md-inline-block  me-lg-4">Children</span>
        <i className="bi bi-bell-fill  me-lg-4"></i>
        <img
          className="me-lg-1"
          id="user-avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
          alt="user-avatar"
          onMouseEnter={() => {
            setShowAccountDropdown(true);
          }}
          onMouseLeave={() => {
            setShowAccountDropdown(false);
          }}
        />
        <i
          className="bi bi-caret-down-fill d-none d-lg-inline-block"
          ref={menuDropdownIcon}
        ></i>
      </span>

      {/* Account Dropdown */}
      <AccountDropdown
        showDropdown={showAccountDropdown}
        updateShowDropdown={(dropdownVisibility) =>
          setShowAccountDropdown(dropdownVisibility)
        }
      />
    </div>
  );
};

export default Navbar;
