import React, { useState } from "react";

import { Link } from "react-router-dom";
import NavContainer from "../Nav/NavContainer"
import Auth from "../../utils/auth";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [sidenav, setSideNav] = useState(false);
  const showSideNav = () => {
    setSideNav(!sidenav);
  };

  return (
    <>
      <nav className={sidenav ? "nav-menu active" : "nav-menu"}>
        <button onClick={showSideNav} className={sidenav ? "header-toggler btn-left" : "header-toggler"}>
          {sidenav ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
        </button>
        <div className="header-container">
          <div className="header-image">
            <a className="image-link" href="/">
              <img alt="jake" src={require("../../assets/pfp_placeholder.png")}></img>
            </a>
          </div>
          <div className="header-menu">
            {/* <Link to="/">Home</Link> */}
            {Auth.loggedIn() ? (
              <>
                <Link to="/profile">Profile</Link>
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <NavContainer/>
              </>
            )}
          </div>
          <p className="header-copyright">
            &copy; 2022{" "}
            <b>
              <a href="/">Imperium</a>
            </b>
          </p>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
