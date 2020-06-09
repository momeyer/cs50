import React, { Component } from "react";
import SearchEngine from "../houses/SearchEngine.js";
import Login from "./Login.js";
import { connect } from "react-redux";
import { updateSearchFilter } from "../../actions/houses.js";

export class Header extends Component {
  filter = ( value ) => {
    this.props.filter.offer_type = value
    console.log(this.props.filter);
     this.props.updateFilter(this.props.filter);
  };

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
            <li className="nav-item mt-2 mr-3 ">
              <button
                onClick={() => this.filter("Rent")}
                className="btn btn-outline-secondary mr-2"
                style={{ border: "none" }}
              >
                Rent
              </button>
              <button
                onClick={() => this.filter("Buy")}
                className="btn btn-outline-secondary "
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

const mapStateToProps = (state) => ({
  filter: state.housesReducer.filter,
});

const mapDispatchToProps = {
  updateFilter: updateSearchFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
