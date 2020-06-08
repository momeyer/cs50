import React, { Component, Fragment } from "react";

class InformationButton extends Component {
  showModal = () => {
    var houseAddress = document.getElementsByClassName("house_address");
    var housePrice = document.getElementsByClassName("house_price");
    var numBed = document.getElementById("num_bed");
    var numBath = document.getElementById("num_bath");
    var size = document.getElementById("size");
    var details = document.getElementById("details");
    var houseDetais = [
      "Multi Family",
      "Cats, small dogs allowed",
      "Deposit: $1,250",
      "Laundry: In Unit",
      "Parking",
      "Laundry: Dryer Washer",
    ];

    for (var i = 0; i < houseAddress.length; i++) {
      houseAddress[
        i
      ].innerHTML = `${this.props.house.address} - ${this.props.house.city}`;
    }
    for (var i = 0; i < housePrice.length; i++) {
      housePrice[i].innerHTML = `US$ ${this.props.house.price}/month`;
    }

    for (var i = 0; i < houseDetais.length; i++) {
      details.innerHTML +=` <li>${houseDetais[i]}</li>`;
    }

    numBed.innerHTML = `${this.props.house.bedroom} bedrooms`;
    numBath.innerHTML = `${this.props.house.bathroom} bathrooms`;
    size.innerHTML = `${this.props.house.size} m2`;
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
          See more - schedule view
        </button>
      </Fragment>
    );
  }
}

export default InformationButton;
