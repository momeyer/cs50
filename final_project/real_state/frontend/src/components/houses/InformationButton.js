import React, { Component, Fragment } from "react";
import InformationModal from "./InformationModal.js";

class InformationButton extends Component {
  render() {
    const house = this.props.house;

    return (
      <Fragment>
        <button
          style={{ borderRadius: "10px" }}
          type="button"
          className="btn btn-outline-primary btn-block"
          data-target="#informationModal"
          data-toggle="modal"
        >
          Check Availability
        </button>
        <InformationModal key="modal" house={house} />
      </Fragment>
    );
  }
}

export default InformationButton;
