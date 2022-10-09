import { useState } from "react";

const NavMenu = () => {
  const [showMenu, setShowMenu] = useState<string>("null");
  return (
    <>
      {/* div to be hovered for displaying dropdown menu */}
      <div
        className="menu-collapsed d-block d-lg-none"
        onMouseEnter={() => setShowMenu("true")}
        onMouseLeave={() => setShowMenu("false")}
      >
        <span className="browse">Browse</span>
        <i className="bi bi-caret-down-fill"></i>
      </div>

      {/* Hidden dropdown menu (small, medium screens) */}
      <nav
        className="menu-dropdown"
        onMouseEnter={() => setShowMenu("withoutTransition")}
        onMouseLeave={() => setShowMenu("false")}
        id={`${
          showMenu === "null"
            ? "hideDropdown"
            : showMenu === "true"
            ? "appear"
            : showMenu === "withoutTransition"
            ? "appear-without-transition"
            : "disappear"
        }`}
      >
        <i className="bi bi-caret-up-fill"></i>
        <div className="home-item">Home</div>
        <div>TV Shows</div>
        <div>Movies</div>
        <div>New &amp; Popular</div>
        <div>My List</div>
      </nav>

      {/* Expanded visible menu (on large screens) */}
      <ul className="menu-expanded d-none d-lg-flex">
        <li className="home-item">Home</li>
        <li>TV Shows</li>
        <li>Movies</li>
        <li>New &amp; Popular</li>
        <li>My List</li>
      </ul>
    </>
  );
};

export default NavMenu;
