import React, { Component } from "react";
import Property from "./Property.js";

export class PropertiesGrid extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "aqua" }} className="row">
        <Property />
      </div>
    );
  }
}

export default PropertiesGrid;
