/* global google */
import React from 'react';
import _ from "lodash";
import { compose, withProps, lifecycle, withHandlers, withState, withStateHandlers } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import iconUrl from './BeerIcon.png'
import "./index.css"

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
    withState('places', 'updatePlaces', ''),
    withState('selectedPlace', 'updateSelectedPlace', null),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: ({ updatePlaces }) => {
                let places;
                const bounds = refs.map.getBounds();
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    bounds: bounds,
                    radius: '500',
                    type: ['bar'],
                    keyword: 'brewing brewery'
                };
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log(results);
                        let choice = (results[0].photos[0].html_attributions[0]).slice(8).split(">");
                        let link = choice[0]
                        console.log(link)
                        updatePlaces(results);
                    }
                })
            },
            onToggleOpen: ({ updateSelectedPlace }) => key => {
                updateSelectedPlace(key);
            }
        }
    })
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

            {props.places && props.places.map((place, i) =>
                <Marker onClick={() => props.onToggleOpen(i)} icon={iconUrl} key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}>
                    {props.selectedPlace === i && <InfoWindow onCloseClick={props.onToggleOpen}>
                        <div id="googleInfoBox" >
                            <h6>{props.places[props.selectedPlace].name}</h6>
                            <p>{props.places[props.selectedPlace].vicinity.split(", ")[0]}</p>
                            <p>{props.places[props.selectedPlace].vicinity.split(", ")[1]}, {props.places[props.selectedPlace].plus_code.compound_code.split(", ")[1]}</p>
                            <p>Rating: {props.places[props.selectedPlace].rating}</p>
                            <p>Price Level: {props.places[props.selectedPlace].price_level}</p>
                            {props.places[props.selectedPlace].opening_hours.open_now ? <p>Currently Open!</p> : <p>Currently Closed.</p>}
                            {/* this link is pulling thru our websites and just adding it after the forward slash localhost:300/??????  */}
                            <p><a href={props.places[props.selectedPlace].photos[0].html_attributions[0].slice(8).split(">")[0]} target="_blank">View on Google Maps</a></p>
                        </div>
                    </InfoWindow>}
                </Marker>
            )}

            {/* {props.markers.map((marker, index) =>
                <Marker
                    key={index}
                    position={marker.position}
                    icon={iconUrl}
                />
            )} */}
        </GoogleMap>
    )
}
);

export default MapWithASearchBox;

