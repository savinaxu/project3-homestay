import React, { Component } from 'react';
import { MapWithAGeocode } from "../../map/GoogleMap";

class RentalMap extends Component {
    render() {
        const location = this.props.location
        return(
            <MapWithAGeocode
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyArhUl2cxRwnKFEIculsxE28qKqfhg6Big&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
            />
        )
    }
}

export default RentalMap