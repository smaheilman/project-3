import React, { useState } from "react";

import { Link } from "react-router-dom";

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
          {/* <div className="header-image">
            <a className="image-link" href="/">
              <img alt="jake" src={require("../../assets/images/pfp.jpeg")}></img>
            </a>
            <div className="header-links">
              <a href="https://github.com/Jakeology" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/jacob-bartoletta-9b1566216/" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://stackoverflow.com/users/16644863/jacob-b" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-stack-overflow"></i>
              </a>
            </div>
          </div> */}
          <div>
            <Link to="/home">Home</Link>
            {Auth.loggedIn() ? (
              <>
                <Link to="/profile">Profile</Link>
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </div>
          <p className="header-copyright">
            &copy; 2022{" "}
            <b>
              <a href="/">Jakeology.io</a>
            </b>
          </p>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
