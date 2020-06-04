import React, { Component } from "react";
import { connect } from "react-redux";
import { updateHouseFilter } from "../../actions/houses.js";
import SaveSearchButton from './SaveSearchButton.js'

export class Header extends Component {
  search = () => {
    this.props.updateFilter(document.getElementById("search-content").value);
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Real State Webpage
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="form-inline my-5 my-lg-0">
          <input
            id="search-content"
            className="form-control mr-sm-1 "
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button onClick={this.search} className="btn btn-danger my-2">
            <svg
              className="bi bi-search"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              />
              <path
                fillRule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              />
            </svg>
          </button>
        </div>
        <SaveSearchButton />
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  houses: state.housesReducer.houses,
  search: state.housesReducer.search,
});

const mapDispatchToProps = {
  updateFilter: updateHouseFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
