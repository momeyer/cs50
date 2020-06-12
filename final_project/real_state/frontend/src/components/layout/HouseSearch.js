import React, { Component } from "react";
import RegistrationForm from "../layout/RegistrationForm.js";
import Houses from "../houses/Houses.js";
import MapComponent from "../map/MapComponent.js";
import InformationModal from "../../components/houses/InformationModal.js";

class HouseSearch extends Component {
 
  

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7">
            <Houses />
          </div>
          <div className="col-md-5 ml-n2 mt-3 mb-3">
            <MapComponent />
            <InformationModal key="modal" />
            <RegistrationForm />
          </div>
        </div>
      </div>
    );
  }
}

export default HouseSearch;
