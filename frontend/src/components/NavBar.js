import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header
      className="navbar navbar-expand-md d-print-none bg-light ">
      <div className="container-xl">
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <h3> Project </h3>
        </div>
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item d-none d-md-flex me-3">
            <div className="btn-list">
              <div
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                <Link to="/login" className="text-decoration-none text-dark"> Login </Link>
              </div>
              <div 
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                <Link to="/register" className="text-decoration-none text-dark"> Register </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
