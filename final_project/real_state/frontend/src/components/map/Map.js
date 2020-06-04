import React, { Component } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";


class Map extends Component {
    render() { 
        return (
          <img
            src="../static/images/map.jpg" height='100%' width='900px' style={{borderRadius:'10px'}} />
        );
    }
}
export default Map;