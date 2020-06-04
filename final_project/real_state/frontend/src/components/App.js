import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./layout/Header.js";
import Houses from "./houses/Houses.js";
import Map from "../components/map/Map.js";
import InformationModal from '../components/houses/InformationModal.js'

import { Provider } from "react-redux";
import store from "../store.js";

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <Houses />
              </div>
              <div
                className="col-md-4"
                style={{
                  borderStyle: "solid",
                  borderRadius: "5%",
                  borderWidth: "1px",
                  borderColor: "#66ccff",
                }}
              >
                <Map />
                <InformationModal key="modal" />
              </div>
            </div>
          </div>
        </Fragment>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
