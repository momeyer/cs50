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
      <li className="nav-item offset-3">
        <div
          className="btn bg-light bg-light text-secondary mt-2 "
          style={{
            border: "none",
          }}
        >
          <span className="mt-2" style={{ textTransform: "capitalize" }}>
            hello {localStorage.getItem("user")}!
          </span>
        </div>
        <Link
          to="/profile"
          className="btn btn-outline-secondary mt-2 "
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
      </li>
    );

    return (
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light"
        style={{ overflowX: "hidden" }}
      >
        <a className="navbar-brand " href="#">
          <img
            src="../static/images/logo.png"
            height="50px"
            className="mr-2"
          />
          <span>RS4U</span>
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
            {!this.props.auth.isAuthenticated ? (
              <li className="nav-item col-md-8">
                <Login />
              </li>
            ) : (
              authLinks
            )}
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
