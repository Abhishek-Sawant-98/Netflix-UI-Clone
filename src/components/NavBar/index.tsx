import { useEffect, useState, useRef } from "react";
import { VITE_NETFLIX_LOGO, VITE_USER_AVATAR } from "../../utility/app";
import AccountDropdown from "../AccountDropdown";
import NavMenu from "../NavMenu";
import './index.scss';

const Navbar = () => {
    const [showHeaderbg, setShowHeaderbg] = useState<boolean>(false);
    const [showAccountDropdown, setShowAccountDropdown] =
        useState<string>("null");

    const menuDropdownIcon = useRef<HTMLElement>();

    const displayAccountDropdown = () => setShowAccountDropdown("true");
    const hideAccountDropdown = () => setShowAccountDropdown("false");
    const updateDropdownVisibility = (dropdownVisibility: string) =>
        setShowAccountDropdown(dropdownVisibility);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setShowHeaderbg(window.scrollY > 20);
        });
    }, []);

    useEffect(() => {
        if (!menuDropdownIcon?.current) return;
        menuDropdownIcon.current.style.transform = `rotateZ(${["null", "false"].includes(showAccountDropdown) ? "0" : "180"
            }deg)`;
        menuDropdownIcon.current.style.transition = `transform 0.2s ease ${["null", "false"].includes(showAccountDropdown) ? "0.5s" : ""
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
                src={VITE_NETFLIX_LOGO}
                alt="netflix-logo"
                onClick={() => window.location.reload()}
            />
            {/* Navbar Menu */}
            <NavMenu />

            <span className="right-side-icons me-lg-4">
                <span className="kids d-none d-md-inline-block me-lg-4">Children</span>
                <i className="bi bi-bell-fill me-1 me-sm-2 me-lg-4"></i>
                <img
                    className="me-lg-1"
                    id="user-avatar"
                    src={VITE_USER_AVATAR}
                    alt="user-avatar"
                    onMouseEnter={displayAccountDropdown}
                    onMouseLeave={hideAccountDropdown}
                />
                <i
                    className="bi bi-caret-down-fill d-none d-lg-inline-block"
                    ref={menuDropdownIcon as React.LegacyRef<HTMLElement>}
                ></i>
            </span>

            {/* Account Dropdown */}
            <AccountDropdown
                showDropdown={showAccountDropdown}
                updateShowDropdown={updateDropdownVisibility}
            />
        </div>
    );
};

export default Navbar;
