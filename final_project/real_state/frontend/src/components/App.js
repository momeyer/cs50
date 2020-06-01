import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./layout/Header.js";
import PropertiesGrid from "./properties/Properties_grid.js";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container-fluid">
          <PropertiesGrid />
        </div>
      </Fragment>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
