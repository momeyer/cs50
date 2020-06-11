import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {
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
            <h1>Profile Page</h1>
            <Link
              to="/"
              className="btn btn-outline-secondary "
              style={{ border: "none" }}
            >
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
