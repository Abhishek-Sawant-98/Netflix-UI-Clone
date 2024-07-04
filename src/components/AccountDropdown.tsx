interface Props {
    showDropdown: string;
    updateShowDropdown: (param: string) => void;
}

const AccountDropdown = ({ showDropdown, updateShowDropdown }: Props) => {
    return (
        <div
            onMouseEnter={() => updateShowDropdown("withoutTransition")}
            onMouseLeave={() => updateShowDropdown("false")}
        >
            <nav
                className="account-dropdown  me-lg-4"
                id={`${showDropdown === "null"
                        ? "hideDropdown"
                        : showDropdown === "true"
                            ? "appear"
                            : showDropdown === "withoutTransition"
                                ? "appear-without-transition"
                                : showDropdown === "false"
                                    ? "disappear"
                                    : ""
                    }`}
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
            </nav>
        </div>
    );
};

export default AccountDropdown;
