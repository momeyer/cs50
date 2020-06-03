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
    this.props.getMostRecentHouses();
  }

  render () {
    console.log(this.props)
    const houses = this.props.houses.map( ( house ) => {
      if ( house.city === this.props.search )
      {
          return <House key={house.id} house={house} />;
      }
    });

    return <div style={{overflowY: 'scroll', maxHeight:'90vh'}} className="row">{houses}</div>;
  }
}

const mapStateToProps = ( state ) => ({
  houses: state.housesReducer.houses,
  search: state.housesReducer.search
});

const mapDispatchToProps = {
  getMostRecentHouses: getHouses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Houses);
