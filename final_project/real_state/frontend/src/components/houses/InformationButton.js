import React, { Component, Fragment } from "react";

class InformationButton extends Component {
  showModal = () => {
    document.getElementById(
      "house_address"
    ).innerHTML = `${this.props.house.address} - ${this.props.house.city}`;
    document.getElementById("house_price").innerHTML = this.props.house.price;
  };

  render() {
    return (
      <Fragment>
        <button
          onClick={() => {
            this.showModal();
          }}
          style={{ borderRadius: "10px" }}
          type="button"
          className="btn btn-outline-primary btn-block"
          data-target="#informationModal"
          data-toggle="modal"
        >
          Check Availability
        </button>
      </Fragment>
    );
  }
}

export default InformationButton;
