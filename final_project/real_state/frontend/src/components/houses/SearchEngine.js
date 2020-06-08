import React, { Component } from "react";
import { connect } from "react-redux";
import { updateHouseSearch } from "../../actions/houses.js";

export class SearchEngine extends Component {
  search = () => {
    this.props.updateSearch(
      document.getElementById("search-content").value.trim()
    );
  };

  render() {
    return (
      <div className="form-row align-items-center  mr-5 ">
        <div className="col-10">
          <input
            id="search-content"
            className="form-control mt-2 mr-1"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <div className="col-2">
          <button onClick={this.search} id='search-button' className="btn btn-danger mt-2">
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  houses: state.housesReducer.houses,
  search: state.housesReducer.search,
});

const mapDispatchToProps = {
  updateSearch: updateHouseSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngine);
