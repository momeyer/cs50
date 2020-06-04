import React, { Component } from "react";

export class Login extends Component {
  render() {
    return (
      <form>
        <div className="form-row align-items-center mt-2 ">
          <div className="col-5">
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
                placeholder="Username"
              />
            </div>
          </div>
          <div className="col-5">
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
                type="text"
                className="form-control"
                id="password"
                placeholder="Pasword"
              />
            </div>
          </div>
          <div className="col-2 btn-group">
            <button type="submit" className="btn btn-primary btn-group mb-2">
              Login
            </button>
            <button type="submit" className="btn btn-primary mb-2">
              Register
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default (Login);
