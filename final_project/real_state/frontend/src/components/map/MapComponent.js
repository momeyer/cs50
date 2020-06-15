import React, { Component, useState } from "react";
import { Map, LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import Carousel from "../houses/Carousel.js";
import { getHouses } from "../../actions/houses.js";
import { connect } from "react-redux";
import InformationButton from '../houses/InformationButton.js'

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeHouse: null,
    };
  }

  componentDidMount() {
    this.props.getHouses();
  }

  render() {
    const houseIcon = new Icon({
      iconUrl: "../static/images/geo.svg",
      iconSize: [25, 25],
    });

    return (
      <Map center={[30.240086, -97.738906]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.props.houses.map((house) => (
          <Marker
            icon={houseIcon}
            key={`marker_${house.id}`}
            position={[house.lon, house.lat]}
            onClick={() => {
              this.setState({ activeHouse: house });
            }}
          />
        ))}

        {this.state.activeHouse && (
          <Popup
            position={[this.state.activeHouse.lon, this.state.activeHouse.lat]}
            onClose={() => {
              this.setState({ activeHouse: null });
            }}
          >
            <div
              style={{
                width: "250px",
                overflowY: "hidden",
                maxHeight: "120px",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              <Carousel houseId={0} />
            </div>
            <div>
              <h6>
                <span>
                  <img
                    src="../static/images/bed.png"
                    height="15px"
                    className="mr-2 mb-2 ml-1"
                  />
                  {this.state.activeHouse.bedroom}bd
                </span>
                <span>
                  <img
                    src="../static/images/bath.png"
                    height="15px"
                    className="ml-2 mr-2 mb-2"
                  />
                  {this.state.activeHouse.bathroom}ba
                </span>
                <span>
                  <img
                    src="../static/images/size.png"
                    height="15px"
                    className="ml-2 mr-2 mb-2"
                  />
                  {this.state.activeHouse.size} m2
                </span>
              </h6>
              <h6>
                <span>
                  <img
                    src="../static/images/geo.svg"
                    height="15px"
                    className="mr-2 mb-2 ml-2"
                  />
                  {this.state.activeHouse.address}
                </span>
              </h6>
            </div>
            <InformationButton house={this.state.activeHouse} />
          </Popup>
        )}
      </Map>
    );
  }
}

const mapStateToProps = (state) => ({
  houses: state.housesReducer.houses,
});

const mapDispatchToProps = {
  getHouses: getHouses,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
