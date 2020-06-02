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
    const houses = this.props.houses.map((house) => {
      return (
            <House key={house.id} house={house} />
      );
    });

    return <div className="row">{houses}</div>;
  }
}

const mapStateToProps = (state) => ({
  houses: state.houses.houses,
});

export default connect(mapStateToProps, { getHouses })(Houses);
