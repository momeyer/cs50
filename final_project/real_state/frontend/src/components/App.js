import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./layout/Header.js";
import { Provider } from "react-redux";
import store from "../store.js";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { loadUser } from "../actions/auth.js";
import HouseSearch from "./layout/HouseSearch.js";
import Profile from "./layout/Profile.js";
import PrivateRoute from './common/PrivateRoute.js'


class App extends Component {

  componentDidMount() {
    store.dispatch( loadUser() );
  }
  render() { 
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
              <Header />
            <Switch>
              <Route exact path="/" component={HouseSearch} />
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
