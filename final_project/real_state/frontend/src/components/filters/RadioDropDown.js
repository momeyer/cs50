import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSearchFilter } from "../../actions/houses.js";

class RadioDropDown extends Component {

  filter = () => {
    this.props.filter[this.props.type] = parseInt(
      document.querySelector(`input[name=${this.props.type}]:checked`).value
    );
    this.props.updateFilter(this.props.filter);
  };

  generateButtons = () => {
    const divElements = [ "" ];
    for (var i = 0; i < this.props.options.length; i++) {
      divElements.push(
        <div
          key={
            this.props.type !== "price"
              ? `${this.props.type}_${this.props.options[i]}`
              : `${this.props.type}_${this.props.values[i]}`
          }
          className="form-group ml-3"
        >
          <div className="form-check">
            <input
              onClick={this.filter}
              name={this.props.type}
              type="radio"
              className="form-check-input"
              id={`filter_${this.props.type}_${i}`}
              value={this.props.values[i]}
            />
            <label
              className="form-check-label"
              htmlFor={`filter_${this.props.type}_${i}`}
            >
              {this.props.type !== "price"
                ? this.props.options[i]
                : `${this.props.options[i]} ${this.props.values[i]}.00`}
            </label>
          </div>
        </div>
      );
    }
    return divElements;
  }

  render() {
    const options = this.generateButtons(this.props.options);

    return (
      <div className="dropdown mr-2 mt-3">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id={`${this.props.type}Filter`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>
            <img
              src={ `../static/images/${ this.props.type}.png`}
              height="15px"
              className="mb-1 mr-2"
            />
            {this.props.title}
          </span>
        </button>

        <div className="dropdown-menu" aria-labelledby={`${this.props.type}Filter`}>
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

export default connect(mapStateToProps, mapDispatchToProps)(RadioDropDown);
