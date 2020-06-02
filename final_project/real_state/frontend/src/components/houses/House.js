import React, { Component, Fragment } from "react";
import Carousel from "./Carousel.js";
import InformationButton from "./InformationButton";
import InformationModal from "./InformationModal.js";

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
          </div>
          <InformationButton key={`info_button_house_${this.props.house.id}`} house={this.props.house} />
        </div>
      </Fragment>
    );
  }
}

export default House;
