import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./layout/Header.js";
import Houses from "./houses/Houses.js";
import Map from "../components/map/Map.js";
import InformationModal from "../components/houses/InformationModal.js";
import { Provider } from "react-redux";
import store from "../store.js";
import RegistrationForm from "./layout/RegistrationForm.js";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {loadUser } from '../actions/auth.js'


class App extends Component {

  // componentDidMount () {
  //   store.dispatch(loadUser())
  // }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8">
                  <Houses />
                </div>
                <div
                  className="col-md-4 ml-n2 mt-3 mb-3"
                  style={{
                    maxHeight: "87vh",
                    overflow: "hidden",
                    borderRadius: "10px",
                  }}
                >
                  <Map />
                  <InformationModal key="modal" />
                  <RegistrationForm />
                </div>
              </div>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
