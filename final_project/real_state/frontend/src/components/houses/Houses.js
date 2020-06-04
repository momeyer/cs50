import React, { Component, Fragment } from "react";
import House from "./House.js";
import Filters from '../filters/Filters.js'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHouses } from "../../actions/houses.js";

export class Houses extends Component {
  static propTypes = {
    houses: PropTypes.array.isRequired,
  };

  style = {
    overflowY: "scroll",
    maxHeight: "80vh",
  };

  componentDidMount() {
    this.props.getMostRecentHouses();
  }

  render() {
    const houses = this.props.houses.map((house) => {
      if (this.props.search === "") {
        return <House key={house.id} house={house} />;
      } else if (house.city === this.props.search) {
        return <House key={house.id} house={house} />;
      }
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
});

const mapDispatchToProps = {
  getMostRecentHouses: getHouses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Houses);
