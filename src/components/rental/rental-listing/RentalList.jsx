import React, { Component } from 'react';
import { RentalCard } from "./RentalCard";

class RentalList extends Component {

    renderRentals() {
        return this.props.rentals.map((rental, index) => (
                <RentalCard 
                    key={index} 
                    rental={rental}
                />
            )
        )
    }
    render() {
        return(
            <div className='row'>
                {this.renderRentals()}
            </div>
        )
    }
}

export default RentalList

