import React, { Component } from "react";
import { Map, LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import * as locations from "./data/locations.json";
import Carousel from '../houses/Carousel.js'

function MapComponent () {
  
  const [activePark, setActivePark] = React.useState(null);

  const skater = new Icon({
    iconUrl: "../static/images/houseType.png",
    iconSize: [25, 25],
  });
  

  return (
    <Map center={[45.4, -75.7]} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.features.map((house) => (
        <Marker
          icon={skater}
          key={`marker_${house.properties.HOUSE_ID}`}
          position={[
            house.geometry.coordinates[0],
            house.geometry.coordinates[1],
          ]}
          onClick={() => {
            setActivePark(house);
          }}
        />
      ))}

      {activePark && (
        <Popup
          position={[
            activePark.geometry.coordinates[0],
            activePark.geometry.coordinates[1],
          ]}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div>
            <div style={{overflowY:'hidden', maxHeight:'120px', borderRadius:'10px', marginBottom:'15px'}}>
              <Carousel houseId={0} />
            </div>
            <h5>{activePark.properties.ADDRESS}</h5>
            <p>{activePark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default MapComponent;
