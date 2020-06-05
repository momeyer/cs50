import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSearchFilter } from "../../actions/houses.js";

class PriceFilter extends Component {

  filter = () => {
    console.log(parseInt(
      document.querySelector("input[name=price]:checked").value)
    // this.props.filter["price"] = parseInt(
    //   document.querySelector("input[name=bed]:checked").value
    // );
    // this.props.updateFilter(this.props.filter);
    )};

  generateButtons(filters) {
    const divElements = [""];
    var value = 0;

    for (var i = 0; i < filters.length; i++) {
      divElements.push(
          <div key={ `price_${ filters[ i ] }_${value}` } className="form-group ml-3">
          <div className="form-check">
            <input
              onClick={ this.filter }
              name="price"
              type="radio"
              className="form-check-input"
              id={ `filter_price_${ i }` }
              value={ value += 500 }
            />
            <label className="form-check-label" htmlFor={ `filter_price_${ i }` }>
              { filters[ i ] + value }
            </label>
          </div>
        </div>
      )
    }
    return divElements;
  }

  render() {
    const pricesFilers = [
      "up to US$ ",
      "up to US$ ",
      "up to US$ ",
      "up to US$ ",
      "min of US$",
    ];
    const options = this.generateButtons(pricesFilers);

    return (
      <div className="dropdown mr-2 mt-3 ml-n4">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="priceFilter"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span>
            <img
              src="../static/images/price.png"
              height="15px"
              className="mb-1 mr-2"
            />
            Price
          </span>
        </button>
        <div className="dropdown-menu" aria-labelledby="priceFilter">
          {options}
        </div>
      </div>
    );
  }
}

export default PriceFilter;
