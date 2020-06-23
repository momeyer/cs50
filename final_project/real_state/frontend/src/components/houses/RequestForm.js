import React, { Component, Fragment } from "react";
import { sendRequest } from "../../actions/houses.js";
import { connect } from "react-redux";
import { string } from "prop-types";

class RequestForm extends Component {
  onSubmit = (e) => {
      e.preventDefault();
      var email = document.getElementById("email");
      var name = document.getElementById("name");
      var message = document.getElementById("request");
    const request = {
      house_id: document.getElementById("house_id").innerHTML,
      email: email.value,
      name: name.value,
      request: message.value,
    };
      this.props.sendRequest( request );
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-group row">
            <div className="col-sm-12 mt-5">
              <p className="house_address"></p>
              <p className="house_price"></p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Your email"
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your name"
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <textarea
                type="text"
                className="form-control"
                id="request"
                placeholder="Let us know what information you are looking for."
                required
              />
            </div>
          </div>
          <button
            data-dismiss="modal"
            type="submit"
            className="btn btn-outline-primary"
            style={{ borderRadius: "5px" }}
          >
            send
          </button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  filter: state.housesReducer.filter,
});
const mapDispatchToProps = {
  sendRequest: sendRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
