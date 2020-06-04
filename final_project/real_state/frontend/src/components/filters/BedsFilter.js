import React, { Component } from "react";

class BedsFilter extends Component {
  generateButtons(filters) {
    const divElements = [""];
    for (var i = 0; i < filters.length; i++) {
      divElements.push(
        <div key={`beds_${filters[i]}`} className="form-group ml-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`filter_bed_${i}`}
            />
            <label className="form-check-label" htmlFor={`filter_bed_${i}`}>
              {filters[i]}
            </label>
          </div>
        </div>
      );
    }
    return divElements;
  }

  render() {
    const bedsFilers = ["Studio", " 1 Bed", " 2 Beds", " 3 Beds", "4+ Beds"];
    const options = this.generateButtons(bedsFilers);

    return (
      <div className="dropdown mr-2 mt-3">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="BedsFilter"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>
            <img
              src="../static/images/bed.png"
              height="15px"
              className="mb-1 mr-2"
            />
           Beds
          </span>
        </button>

        <div className="dropdown-menu" aria-labelledby="bedsFilter">
          {options}
        </div>
      </div>
    );
  }
}

export default BedsFilter;
