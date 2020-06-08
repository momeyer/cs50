import React, { Component } from "react";
import SearchEngine from "../houses/SearchEngine.js";
import Login from './Login.js'

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Real State
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <SearchEngine />
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-secondary mt-2 ml-n3"
                style={{ border: "none" }}
              >
                Rent
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-secondary mt-2 ml-2 mr-4"
                style={{ border: "none" }}
              >
                Buy
              </button>
            </li>
            <li>
              <Login />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Header;
