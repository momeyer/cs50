import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getLikedHouses } from "../../actions/houses.js";
import { getHouses } from "../../actions/houses.js";
import House from "../houses/House.js";

import { connect } from "react-redux";

class Profile extends Component {
  style = {
    maxHeight: "87vh",
    overflow: "hidden",
    borderRadius: "10px",
  };

  componentDidMount() {
    this.props.getLikedHouses(this.props.auth.user.id);
    this.props.getHouses();
  }

  select = ( likedHouses, houses ) => {
    var housesToReturn = []
    for ( var i = 0; i < likedHouses.length; ++i )
    {
      housesToReturn.push(houses.filter((house) => house.id === likedHouses[i].house_id))
    }

    return housesToReturn.map( ( house ) => { return <House key={ `liked_${house[0].id} `} house={ house[0] } />; } );
  }

  render() {
    const userId = this.props.auth.user.id;
    const likedHouses = this.select( this.props.liked, this.props.houses );


    return (
      <div className="container-fluid text-secondary mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1 style={{ textTransform: "capitalize" }}>
              {" "}
              Welcome {localStorage.getItem("user")}!
            </h1>
            <Link
              to="/"
              className="btn btn-outline-secondary "
              style={{ border: "none" }}
            >
              Back to Search
            </Link>
          </div>
        </div>
        <div className="row">{likedHouses}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  liked: state.housesReducer.likedHouses,
  houses: state.housesReducer.houses,
});

const mapDispatchToProps = {
  getLikedHouses: getLikedHouses,
  getHouses: getHouses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
