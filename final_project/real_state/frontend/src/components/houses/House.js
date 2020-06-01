import React, { Component, Fragment } from "react";
import Carousel from "./Carousel.js";

export class House extends Component {
  render() {
    return (
      <Fragment>
        <div
          className="card"
          style={{ width: "16rem", margin: "15px", border: "none" }}
        >
          <Carousel houseId={this.props.house.id} />
          <div className="card-body">
            <h5 className="card-title">{this.props.house.price}/month</h5>
            <div className="card-text">
              <p>Address: {this.props.house.address}</p>
              <p>Property type: {this.props.house.property_type}</p>
              <p>Offered since: {this.props.house.created_at.slice(0, 10)}</p>
            </div>
            <a
              href="#"
              className="btn btn-outline-primary btn-block"
              style={{ borderRadius: "10px" }}
            >
              Check Availability
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default House;
