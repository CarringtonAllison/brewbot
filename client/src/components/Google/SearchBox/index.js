/* global google */
import React from 'react';
import _ from "lodash";
import { compose, withProps, lifecycle, withHandlers, withState } from "recompose";
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
        }
    }),
    withScriptjs,
    withGoogleMap,
    // withState('places', 'updatePlaces', ''),
    // withHandlers(() => {
    //     const refs = {
    //         map: undefined,
    //     }

    //     return {
    //         onMapMounted: () => ref => {
    //             refs.map = ref
    //         },
    //         fetchPlaces: ({ updatePlaces }) => {
    //             let places;
    //             const bounds = refs.map.getBounds();
    //             const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
    //             const request = {
    //                 bounds: bounds,
    //                 radius: '500',
    //                 type: ['bar']
    //             };
    //             service.nearbySearch(request, (results, status) => {
    //                 if (status === google.maps.places.PlacesServiceStatus.OK) {
    //                     console.log(results);
    //                     updatePlaces(results);
    //                 }
    //             })
    //         }
    //     }
    // })
)(props => {

    const checkScreen = () => {
        if (window.matchMedia("(max-width: 600px)").matches) {
            return google.maps.ControlPosition.LEFT
        } else {
            return google.maps.ControlPosition.TOP

        }

    }

    return (
        <GoogleMap
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            defaultZoom={15}
            center={props.center}
        // onBoundsChanged={props.onBoundsChanged}
        >
            <SearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                controlPosition={checkScreen()}
                onPlacesChanged={props.onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Search For Breweries"
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
            {/* {props.places && props.places.map((place, i) =>
                <Marker key={i} icon={iconUrl} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
            )} */}
            {props.markers.map((marker, index) =>
                <Marker
                    key={index}
                    position={marker.position}
                    icon={iconUrl}
                />
            )}
        </GoogleMap>
    )
}
);

export default MapWithASearchBox;

