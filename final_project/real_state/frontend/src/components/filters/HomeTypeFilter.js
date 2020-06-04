import React, { Component } from "react";

class HomeTypeFilter extends Component {
  generateButtons(filters) {
    const divElements = [""];
    for (var i = 0; i < filters.length; i++) {
      divElements.push(
        <div key={`hometype_${filters[i]}`} className="form-group ml-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`filter_home_type_${i}`}
            />
            <label
              className="form-check-label"
              htmlFor={`filter_home_type_${i}`}
            >
              {filters[i]}
            </label>
          </div>
        </div>
      );
    }
    return divElements;
  }

  render() {
    const homeTypesFilers = ["House", "Apartment", "Condo", "Farm"];
    const options = this.generateButtons(homeTypesFilers);

    return (
      <div className="dropdown mr-2 mt-3">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="houseTypeFilter"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>
            <img
              src="../static/images/houseType.png"
              height="15px"
              className="mb-1 mr-2"
            />
            Home Type
          </span>
        </button>

        <div className="dropdown-menu" aria-labelledby="houseTypeFilter">
          {options}
        </div>
      </div>
    );
  }
}

export default HomeTypeFilter;
