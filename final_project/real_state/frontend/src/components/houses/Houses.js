import React, { Component, Fragment } from "react";
import House from "./House.js";
import Filters from "../filters/Filters.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHouses } from "../../actions/houses.js";

export class Houses extends Component {
  static propTypes = {
    houses: PropTypes.array.isRequired,
  };

  style = {
    overflowY: "scroll",
    Height: "80vh",
    maxHeight: "80vh",
  };

  searchHouses = (house) => {
    switch (this.props.search) {
      case "":
        return <House key={house.id} house={house} />;
      case house.property_type:
        return <House key={house.id} house={house} />;
      case house.city:
        return <House key={house.id} house={house} />;
      default:
        break;
    }
  };

  componentDidMount() {
    this.props.getMostRecentHouses();
  }

  render() {
    const houses = this.props.houses.map((house) => {
      return this.searchHouses(house);
    });

    return (
      <Fragment>
        <Filters />
        <div style={this.style} className="row">
          {houses}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  houses: state.housesReducer.houses,
  search: state.housesReducer.search,
  filter: state.housesReducer.filter,
});

const mapDispatchToProps = {
  getMostRecentHouses: getHouses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Houses);
