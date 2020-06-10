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

  checkFilters ( house, filter ) {
    return (house.bedroom >= filter.bed &&
      house.bathroom >= filter.bath &&
      house.year >= filter.built &&
      house.price <= filter.price &&
      house.size >= filter.size &&
      house.offer_type === filter.offer_type);
  }


  applyFilter(house, filter) {
    var includeNewHouse = this.checkFilters(house, filter)
    
    if (filter.home_type.length > 0) {
      includeNewHouse =
        includeNewHouse && filter.home_type.includes(house.property_type);
    }

    return includeNewHouse;
  }

  searchHouses = (house) => {
    if (this.props.search === "") {
      if (this.applyFilter(house, this.props.filter)) {
        return <House key={house.id} house={house} />;
      }
    } else if (this.props.search.toLowerCase() === house.city.toLowerCase()) {
      return <House key={house.id} house={house} />;
    }

    else if (house.city.toLowerCase().includes(this.props.search.toLowerCase()) || house.address.toLowerCase().includes( this.props.search.toLowerCase()))
    {
      return <House key={house.id} house={house} />;
    }
  };

  componentDidMount() {
    this.props.getMostRecentHouses();
  }

  render() {
    console.log(this.props.houses);
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
