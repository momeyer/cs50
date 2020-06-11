import React, { Component } from "react";

class RegistrationForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log("Submit registration: ", this.state);
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  render() {
    const { username, email, password } = this.state;
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
                <form onSubmit={this.onSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="RegistrationUsername">Username</label>
                      <input
                        onChange={this.onChange}
                        name="username"
                        value={username}
                        type="text"
                        className="form-control"
                        id="RegistrationUsername"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="registrationEmail">Email</label>
                    <input
                      onChange={this.onChange}
                      name="email"
                      value={email}
                      type="email"
                      className="form-control"
                      id="registrationEmail"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="registrationPassword">Password</label>
                    <input
                      onChange={this.onChange}
                      name="password"
                      value={password}
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
