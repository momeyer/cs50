import React, { Component, Fragment } from "react";
import Carousel from './Carousel.js'

export class Property extends Component {
  render () {
    return (
      <Fragment>
        <div className="card" style={{width: '18rem', margin:'15px'}}>
          <Carousel />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Property;
