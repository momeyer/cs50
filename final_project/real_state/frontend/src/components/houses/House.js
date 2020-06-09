import React, { Component, Fragment } from "react";
import Carousel from "./Carousel.js";
import InformationButton from "./InformationButton";

export class House extends Component {
  render() {
    return (
      <Fragment>
        <div
          className="card"
          style={{ width: "16rem", margin: "15px", border: "none" }}
        >
          <div style={{ maxHeight: "100px", overflow: "hidden" }}>
            <Carousel houseId={this.props.house.id} />
          </div>
          <div className="card-body">
            <h5
              className="card-title"
              style={{ fontWeight: "bold", color: "#606060" }}
            >
              US$ {this.props.house.offer_type === "Rent"
                ? `${this.props.house.price}/mo`
                : `${this.props.house.price}`}
            </h5>
            <div className="card-text">
              <p>
                <span>
                  <img
                    src="../static/images/bed.png"
                    height="15px"
                    className="mr-2 mb-2"
                  />
                  {this.props.house.bedroom}bd
                </span>
                <span>
                  <img
                    src="../static/images/bath.png"
                    height="15px"
                    className="ml-2 mr-2 mb-2"
                  />
                  {this.props.house.bathroom}ba
                </span>
                <span>
                  <img
                    src="../static/images/size.png"
                    height="15px"
                    className="ml-2 mr-2 mb-2"
                  />
                  {this.props.house.size} m2
                </span>
              </p>
              <span>
                Address: {this.props.house.address} - {this.props.house.city}
              </span>
              <p>Property type: {this.props.house.property_type}</p>
              <small>
                Offered since: {this.props.house.created_at.slice(0, 10)}
              </small>
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
