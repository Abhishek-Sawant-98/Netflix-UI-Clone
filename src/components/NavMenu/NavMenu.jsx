import React from "react";
import "./NavMenu.css";

const NavMenu = () => {
  return (
    <>
      <div className="menu-collapsed  d-block d-lg-none">
        <span className="browse">Browse</span>
        <i className="bi bi-caret-down-fill"></i>
      </div>
      <ul className="menu-expanded d-none d-lg-flex">
        <li style={{ color: "white" }}>Home</li>
        <li>TV Shows</li>
        <li>Movies</li>
        <li>New &amp; Popular</li>
        <li>My List</li>
      </ul>
    </>
  );
};

export default NavMenu;
