import React, { Component } from 'react';
import { Cacher } from 'services/cacher';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle,
    InfoWindow
} from "react-google-maps";

const MapComponent = props => {
    const { coordinates, isError, isLocationLoaded } = props;
    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={coordinates}
            center={coordinates}
        >
            { isLocationLoaded && !isError && <Circle center={coordinates} radius={500} /> }
            { isLocationLoaded && isError &&
                <InfoWindow position={coordinates} options={{maxWidth: 300}}>
                    <div>
                        Uuuuups, there is problem to find location on the map, we are trying to resolve
                        problem as fast as possible. Contact host for additional informations if you are
                        still interested in booking this place. We are sorry for incoviniance.
                    </div>
                </InfoWindow>
            }
        </GoogleMap>
    )
}

const withGeocode = WrappedComponent => {
    return class extends Component {
        constructor() {
            super()
            this.cacher = new Cacher()
            this.state = {
                coordinates: {
                    lat: 0,
                    lng: 0
                  },
                  isError: false,
                  isLocationLoaded: false
            }
        }

        componentWillMount() {
            this.getGeocodedLocation();
        }

        geocodeLocation(location){
            const geocoder = new window.google.maps.Geocoder();

            return new Promise((resolve, reject) => {
                geocoder.geocode({address: location}, (result, status) => {
                    if (status === 'OK') {
                        const geometry = result[0].geometry.location;
                        const coordinates = { lat: geometry.lat(), lng: geometry.lng()};
                        this.cacher.cacheValue(location, coordinates);
                        resolve(coordinates);
                    } else {
                        reject('ERROR!!!!');
                    }
                });
            });
        }

        getGeocodedLocation() {
            const location = this.props.location

            if (this.cacher.isValueCached(location)) {
                this.setState({
                    coordinates: this.cacher.getCachedValue(location),
                    isLocationLoaded: true
                })
            } else {
                this.geocodeLocation(location)
                    .then((coordinates)=> {
                        this.setState({
                            coordinates,
                            isLocationLoaded: true
                        })
                    },
                    (error) => {
                        this.setState({
                            isLocationLoaded: true, 
                            isError: true
                        })
                    })
            }   
        }
        
        render() {
            return(
                <WrappedComponent {...this.state}/>
            )
        }
    }
}

export const MapWithAGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));

