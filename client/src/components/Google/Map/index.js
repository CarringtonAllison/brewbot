/* global google */
import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import MapWithASearchBox from "../SearchBox";





const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAcQl4iPpVUlK2Dx-UXBUJIzkSMn-CnIHA&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, width: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => (
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 33.4484, lng: -112.0740 }}
    >
        <MapWithASearchBox />
        <MarkerWithLabel
            position={{ lat: 33.4484, lng: -112.0740 }}
            labelAnchor={new google.maps.Point(0, 0)}
            labelStyle={{
                backgroundImage: "url(https://freeiconshop.com/wp-content/uploads/edd/beer-outline-filled.png)",
                height: "30px",
                width: "30px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}
        ><div>Testing</div></MarkerWithLabel>
    </GoogleMap>
))

export default MyMapComponent;


