import React, { Component } from "react";
import RegistrationForm from "../layout/RegistrationForm.js";
import Houses from "../houses/Houses.js";
import Map from "../../components/map/Map.js";
import InformationModal from "../../components/houses/InformationModal.js";

class HouseSearch extends Component {
  style = {
    maxHeight: "87vh",
    overflow: "hidden",
    borderRadius: "10px",
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <Houses />
          </div>
          <div className="col-md-4 ml-n2 mt-3 mb-3" style={this.style}>
            <Map />
            <InformationModal key="modal" />
            <RegistrationForm />
          </div>
        </div>
      </div>
    );
  }
}

export default HouseSearch;
