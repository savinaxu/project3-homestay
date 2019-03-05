import React, { Component } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MapComponent = props => {
    const { coordinates } = props;
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={coordinates}
            center={coordinates}
        >
            <Marker
            position={coordinates}
            />
        </GoogleMap>
    )
}

const withGeocode = WrappedComponent => {
    return class extends Component {
        constructor() {
            super()
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
            this.geocodeLocation();
        }

        geocodeLocation() {
            const location = this.props.location
            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({address: location}, (result, status) => {
                if (status === 'OK') {
                    const geometry = result[0].geometry.location;
                    const coordinates = { lat: geometry.lat(), lng: geometry.lng()};
                    this.setState({
                        coordinates
                    })
                }
            })
      
            // return new Promise((resolve, reject) => {
            //     geocoder.geocode({address: location}, (result, status) => {
            //         if (status === 'OK') {
            //         const geometry = result[0].geometry.location;
            //         const coordinates = { lat: geometry.lat(), lng: geometry.lng()};
            //         this.cacher.cacheValue(location, coordinates);
            //         resolve(coordinates);
            //         } else {
            //         reject('ERROR!!!!');
            //         }
            //     });
            // });
        }
        
        render() {
            return(
                <WrappedComponent {...this.state}/>
            )
        }
    }
}

export const MapWithAGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));

