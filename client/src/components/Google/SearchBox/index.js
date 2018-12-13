/* global google */
import React from 'react';
import _ from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import iconUrl from './BeerIcon.png'

const MapWithASearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAcQl4iPpVUlK2Dx-UXBUJIzkSMn-CnIHA&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%`, borderRadius: `20px`, boxShadow: `0px 0px 20px 10px rgba(0,0,0,.4)`, border: `1px solid black` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                places: [],
                searchText: '',
                error: null,
                bounds: null,
                center: {
                    lat: 33.3062, lng: -111.8413
                },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    // refs.map.fitBounds(bounds);
                },
            })


            // const geocoder = new google.maps.Geocoder();
            // geocoder.geocode({ address: this.props.placeName }, (results, status) => {
            //     if (status === google.maps.DirectionsStatus.OK) {
            //         const lngs = results[0].geometry.bounds.j;
            //         const lats = results[0].geometry.bounds.l;
            //         this.setState({
            //             boundSearch: new google.maps.LatLngBounds(
            //                 new google.maps.LatLng(lats.l, lngs.l),
            //                 new google.maps.LatLng(lats.j, lngs.j)
            //             ),
            //         });
            //     } else {
            //         this.setState({
            //             error: status,
            //         });
            //     }
            // });

        }
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.center}
    // onBoundsChanged={props.onBoundsChanged}
    >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Search For Brews"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    marginTop: `27px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </SearchBox>
        {props.markers.map((marker, index) =>
            <Marker
                key={index}
                position={marker.position}
                icon={iconUrl}
            />
        )}
    </GoogleMap>
);

export default MapWithASearchBox;

