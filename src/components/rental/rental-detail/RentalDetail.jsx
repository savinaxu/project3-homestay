import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import { RentalDetailInfo } from './RentalDetailInfo'
import Booking from 'components/booking/Booking';

import RentalMap from './RentalMap'

class RentalDetail extends Component {
    componentWillMount() {
        //dispatch action
        const rentalId = this.props.match.params.id

        this.props.dispatch(actions.fetchRentalsById(rentalId))
    }
    render() {
        const rental = this.props.rental

        if (rental._id) {
            return(
                <section id='rentalDetails'>
                    <div className='upper-section'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <img src={rental.image} alt=''></img>
                            </div>
                            <div className='col-md-6'>
                                <RentalMap location={`${rental.city}, ${rental.street}`} />
                            </div>
                        </div>
                    </div>

                    <div className='details-section'>
                        <div className='row'>
                        <div className='col-md-8'>
                            <RentalDetailInfo 
                                rental={rental}
                            />
                        </div>
                        <div className='col-md-4'>
                            <Booking rental={rental} />
                        </div>
                        </div>
                    </div>
                </section>
            )
        } else {
            return(
                <h1>Loading...</h1>
            )
        }
        
    }
}

function mapStateToProps(state) {
    return {
        rental: state.rental.data
    }
}

export default connect(mapStateToProps)(RentalDetail)

