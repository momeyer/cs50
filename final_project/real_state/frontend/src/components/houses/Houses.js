import React, { Component, Fragment } from "react";
import House from "./House.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHouses } from "../../actions/houses.js";

export class Houses extends Component {
  static propTypes = {
    houses: PropTypes.array.isRequired,
  };
  componentDidMount() {
    this.props.getHouses();
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          {this.props.houses.map((house) => (
            <House key={house.id} house={house}/>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  houses: state.houses.houses,
});

export default connect(mapStateToProps, { getHouses })(Houses);
