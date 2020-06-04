import React, { Component } from "react";

class PriceFilter extends Component {

    generateButtons(filters) {
    const divElements = ['']
    for ( var i = 0; i < filters.length ; i++ )
    {
        divElements.push(
          <button key={`price_${filters[i]}`} className="dropdown-item" type="button">
            { filters[i] }
            </button> )
    }
    return divElements;
  }

    render () {
        const pricesFilers = [
          "$100 - $500",
          " $500 - $1000",
          " $1000 - $1500",
          " $2000 - And Up",
        ];
        const options = this.generateButtons(pricesFilers)

        return (
          <div className="dropdown mr-2 mt-3">
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