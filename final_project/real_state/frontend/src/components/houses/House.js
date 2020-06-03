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
            <h5 className="card-title" style={{fontWeight:'bold', color:'#606060'}}>{this.props.house.price}/month</h5>
            <div className="card-text">
              <span>
                Address: {this.props.house.address} - {this.props.house.city}
              </span>
              <p>Property type: {this.props.house.property_type}</p>
              <small>Offered since: {this.props.house.created_at.slice(0, 10)}</small>
            </div>
          </div>
          <InformationButton
            key={`info_button_house_${this.props.house.id}`}
            house={this.props.house}
          />
        </div>
      </Fragment>
    );
  }
}

export default House;
