import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/auth.slice";

const NavBar = () => {
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);
  const user = useSelector((state) => state.AuthReducer.user);

  const dispatch = useDispatch();

  return (
    <header className="navbar navbar-expand-md d-print-none bg-light ">
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

            <div className="btn" target="_blank" rel="noreferrer">
                {isAuth && 
                  <Link to="/profile" className="text-decoration-none text-dark">
                    {" "}
                    Profile{" "}
                  </Link>
                }
              </div>

            <div className="btn" target="_blank" rel="noreferrer">
                {isAuth && 
                  <Link to="/feed" className="text-decoration-none text-dark">
                    {" "}
                    Feed{" "}
                  </Link>
                }
              </div>

              <div className="btn" target="_blank" rel="noreferrer">
                {isAuth ? (
                  <h5> {user?.firstName} </h5>
                ) : (
                  <Link to="/login" className="text-decoration-none text-dark">
                    {" "}
                    Login{" "}
                  </Link>
                )}
              </div>

              {isAuth ? (
                <div className="btn" target="_blank" rel="noreferrer" onClick={()=>dispatch(logout())}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                    <path d="M15 12h-12l3 -3" />
                    <path d="M6 15l-3 -3" />
                  </svg>
                </div>
              ) : (
                <div className="btn" target="_blank" rel="noreferrer">
                  <Link
                    to="/register"
                    className="text-decoration-none text-dark"
                  >
                    {" "}
                    Register{" "}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
