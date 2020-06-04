import React, { Component } from "react";

class SizeFilter extends Component {
  generateButtons(filters) {
    const divElements = [""];
    for (var i = 0; i < filters.length; i++) {
      divElements.push(
        <div key={`size_${filters[i]}`} className="form-group ml-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`filter_size_${i}`}
            />
            <label className="form-check-label" htmlFor={`filter_size_${i}`}>
              {filters[i]} m2
            </label>
          </div>
        </div>
      );
    }
    return divElements;
  }

  render() {
    const sizeFilers = ["40+", "50+", "60+", "70+", "80+", "90+"];
    const options = this.generateButtons(sizeFilers);

    return (
      <div className="dropdown mr-2 mt-3">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="sizeFilter"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>
            <img
              src="../static/images/size.png"
              height="15px"
              className="mb-1 mr-2"
            />
            Size
          </span>
        </button>

        <div className="dropdown-menu" aria-labelledby="sizeFilter">
          {options}
        </div>
      </div>
    );
  }
}

export default SizeFilter;
