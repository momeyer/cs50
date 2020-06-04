import React, { Component } from "react";

class BuiltYearFilter extends Component {
  generateButtons(filters) {
    const divElements = [""];
    for (var i = 0; i < filters.length; i++) {
      divElements.push(
        <div key={`built_${filters[i]}`} className="form-group ml-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`filter_built_year_${i}`}
            />
            <label
              className="form-check-label"
              htmlFor={`filter_built_year_${i}`}
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
    const builtYearFilers = ["1950", "2000", "2010", "2015", "2020"];
    const options = this.generateButtons(builtYearFilers);

    return (
      <div className="dropdown mr-2 mt-3">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="builtYearFilter"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>
            <img
              src="../static/images/built.png"
              height="15px"
              className="mb-1 mr-2"
            />
            Built Year
          </span>
        </button>

        <div className="dropdown-menu" aria-labelledby="builtYearFilter">
          {options}
        </div>
      </div>
    );
  }
}

export default BuiltYearFilter;
