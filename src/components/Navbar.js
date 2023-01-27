import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="Nav">
              <ul className="all">
                <Link className="dash"  to="/">
                  <li className="nav-li">Dashboard</li>
                </Link>
                <Link className="dash" to="/list">
                  <li className="nav-li">Todo List</li>
                </Link>
                <Link className="dash" to="/Create">
                  <li className="nav-li">Create Todo</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
