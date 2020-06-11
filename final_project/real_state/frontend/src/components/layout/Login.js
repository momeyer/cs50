import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth.js";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.username, this.state.password);
    this.props.login(this.state.username, this.state.password)
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  render() {
    const { username, password } = this.state;

    return (
      <Fragment>
            <form onSubmit={this.onSubmit}>
              <div className="form-row align-items-center mt-2 ml-n5 col-12">
                <div className="col-md-4 col-xs-8">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <svg
                          className="bi bi-person-fill"
                          width="1.2em"
                          height="1.2em"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Username"
                      onChange={this.onChange}
                      value={username}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-xs-8">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <svg
                          className="bi bi-lock-fill"
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="11" height="9" x="2.5" y="7" rx="2" />
                          <path
                            fillRule="evenodd"
                            d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Pasword"
                      name="password"
                      value={password}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-xs-2">
                  <button
                    type="submit"
                    className="btn btn-outline-primary mb-2"
                    style={{ border: "none" }}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#registrationModal"
                    className="btn btn-outline-primary mb-2"
                    style={{ border: "none" }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated
} );


const mapDispatchToProps = {
  login: login,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
