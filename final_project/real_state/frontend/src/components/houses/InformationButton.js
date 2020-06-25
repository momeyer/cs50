import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {updateSelected} from '../../actions/houses.js'

class InformationButton extends Component {
  showModal = (id) => {
    this.props.select(id)
    var houseAddress = document.getElementsByClassName( "house_address" );
    var housePrice = document.getElementsByClassName("house_price");
    var numBed = document.getElementById("num_bed");
    var numBath = document.getElementById("num_bath");
    var size = document.getElementById("size");
    var details = document.getElementById("details");
    var id = document.getElementById("house_id");
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
      details.innerHTML += ` <li>${houseDetais[i]}</li>`;
    }

    numBed.innerHTML = `${this.props.house.bedroom} bedrooms`;
    numBath.innerHTML = `${this.props.house.bathroom} bathrooms`;
    size.innerHTML = `${this.props.house.size} m2`;
    id.innerHTML = this.props.house.id;
  };

  render () {
    return (
      <Fragment>
        <button
          onClick={() => {
            this.showModal(this.props.houseId);
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

const mapStateToProps = (state) => ({
  selected: state.housesReducer.selected
});


const mapDispatchToProps = {
  select: updateSelected,
};


export default connect(mapStateToProps, mapDispatchToProps)(InformationButton);
