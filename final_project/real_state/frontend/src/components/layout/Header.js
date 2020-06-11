import React, { Component } from "react";
import SearchEngine from "../houses/SearchEngine.js";
import Login from "./Login.js";
import { connect } from "react-redux";
import { updateSearchFilter } from "../../actions/houses.js";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth.js";

export class Header extends Component {
  filter = (value) => {
    this.props.filter.offer_type = value;
    this.props.updateFilter(this.props.filter);
  };

  render () {
    const authLinks = (
      <div>
        <div
          className="btn bg-light bg-light text-secondary mt-2 "
          style={{
            border: "none",
          }}
        >
          <span className="mt-2" style={{ textTransform: "capitalize" }}>
            hello {localStorage.getItem("user")}!
            <svg
              className="bi bi-emoji-laughing ml-2 mr-3 mt-n1"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fillRule="evenodd"
                d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5z"
              />
              <path d="M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
            </svg>
          </span>
        </div>

        <Link
          to="/profile"
          className="btn btn-outline-secondary mt-2"
          style={{
            border: "none",
          }}
        >
          <svg
            className="bi bi-person-lines-fill"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </Link>
        <button
          onClick={this.props.logout}
          className="btn btn-outline-secondary mt-2 "
          style={{
            border: "none",
          }}
        >
          <svg
            className="bi bi-power"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z"
            />
            <path fillRule="evenodd" d="M7.5 8V1h1v7h-1z" />
          </svg>
        </button>
      </div>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light" style={{overflowX:'hidden'}}>
        <a className="navbar-brand " href="#">
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
          <ul className="navbar-nav col-md-12">
            <li className="nav-item col-md-3">
              <SearchEngine />
            </li>
            <li className="nav-item mt-2 col-md-3 ">
              <button
                onClick={() => this.filter("Rent")}
                className="btn btn-outline-secondary mr-1"
              >
                Rent
              </button>
              <button
                onClick={() => this.filter("Buy")}
                className="btn btn-outline-secondary "
              >
                Buy
              </button>
            </li>
            <li className="nav-item col-md-8">
              {!this.props.auth.isAuthenticated ? <Login /> : authLinks}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  filter: state.housesReducer.filter,
  auth: state.authReducer,
});

const mapDispatchToProps = {
  updateFilter: updateSearchFilter,
  logout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
