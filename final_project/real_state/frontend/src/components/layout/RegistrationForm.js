import React, { Component } from "react";

class RegistrationForm extends Component {
  state = {};
  render() {
    return (
      <div
        className="modal fade"
        id="registrationModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="registrationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content text-black-50">
            <div className="modal-header">
              <h5 className="modal-title" id="registrationModalLabel"></h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row col-11 ml-3">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="registrationEmail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="registrationEmail"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="registrationPassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="registrationPassword"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-primary my-3"
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary ml-2 my-3"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
