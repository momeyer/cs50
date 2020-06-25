import React, { Component } from "react";
import RegistrationForm from "../layout/RegistrationForm.js";
import Houses from "../houses/Houses.js";
import MapComponent from "../map/MapComponent.js";

class HouseSearch extends Component {
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <Houses />
          </div>
          <div className="col-md-4 ml-n2 mt-3 mb-3">
            <MapComponent />
            <RegistrationForm />
          </div>
        </div>
      </div>
    );
  }
}

export default HouseSearch;
