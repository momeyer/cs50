import React, { Component } from "react";
import {connect} from 'react-redux'
import { updateSearchFilter } from "../../actions/houses.js";

class BathFilter extends Component {
  filter = () => {
    console.log(document.querySelector("input[name=bath]:checked").value);
    this.props.filter["bath"] = parseInt(
      document.querySelector("input[name=bath]:checked").value
    );
    this.props.updateFilter(this.props.filter);
  };

  generateButtons(filters) {
    const divElements = [""];
    for (var i = 0; i < filters.length; i++) {
      divElements.push(
        <div key={`bath_${filters[i]}`} className="form-group ml-3">
          <div className="form-check">
            <input
              onClick={this.filter}
              name="bath"
              type="radio"
              className="form-check-input"
              id={`filter_bath_${i}`}
              value={i + 1}
            />
            <label className="form-check-label" htmlFor={`filter_bath_${i}`}>
              {filters[i]}
            </label>
          </div>
        </div>
      );
    }
    return divElements;
  }

  render() {
    const bathFilers = [" 1+ Bath", " 2+ Baths", " 3+ Baths", "4+ Baths"];
    const options = this.generateButtons(bathFilers);

    return (
      <div className="dropdown mr-2 mt-3">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="bathFilter"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>
            <img
              src="../static/images/bath.png"
              height="15px"
              className="mb-1 mr-2"
            />
            Baths
          </span>
        </button>

        <div className="dropdown-menu" aria-labelledby="bathFilter">
          {options}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  houses: state.housesReducer.houses,
  search: state.housesReducer.search,
  filter: state.housesReducer.filter,
});

const mapDispatchToProps = {
  updateFilter: updateSearchFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(BathFilter);
