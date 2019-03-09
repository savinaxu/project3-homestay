import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { getRangeOfDates } from 'helpers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as moment from 'moment';
import * as actions from 'actions';

class Booking extends Component {
    constructor() {
        super()

        this.bookedOutDates = []
        this.dateRef = React.createRef()

        this.state = {
            proposedBooking: {
                startAt: '',
                endAt: '',
                guests: '',
                paymentToken: ''
            },
            modal: {
              open: false
            },
            errors: []
        }
      
        this.checkInvalidDates = this.checkInvalidDates.bind(this);
        this.handleApply = this.handleApply.bind(this);
        // this.cancelConfirmation = this.cancelConfirmation.bind(this);
        // this.reserveRental = this.reserveRental.bind(this);
        // this.setPaymentToken = this.setPaymentToken.bind(this);

    }

    componentWillMount() {
        this.getBookedOutDates();
    }
    
    getBookedOutDates() {
        const {bookings} = this.props.rental;

        if (bookings && bookings.length > 0) {
            bookings.forEach(booking => {
                const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
                this.bookedOutDates.push(...dateRange);
            });
        }
    }

    checkInvalidDates(date) {
        return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
    }

    handleApply(event, picker) {
        const startAt = picker.startDate.format('Y/MM/DD');
        const endAt = picker.endDate.format('Y/MM/DD');
    
        this.dateRef.current.value = startAt + ' to ' + endAt;
    
        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                startAt,
                endAt
            }
        });
    }
    
    render() {
        const {rental} = this.props

        return(
            <div className='booking'>
                <h3 className='booking-price'>${rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
                <hr></hr>
                <div className='form-group'>
                    <label htmlFor='dates'>Dates</label>
                    <DateRangePicker 
                            onApply={this.handleApply}
                            isInvalidDate={this.checkInvalidDates}
                            opens='left'
                            containerStyles={{display: 'block'}}>

                        <input ref={this.dateRef} id='dates' type='text' className='form-control'></input>
                        
                    </DateRangePicker >
                </div>
                <div className='form-group'>
                    <label htmlFor='guests'>Guests</label>
                    <input type='number' className='form-control' id='guests' aria-describedby='emailHelp' placeholder=''></input>
                </div>
                <button className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
                <hr></hr>
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                More than 500 people checked this rental in last month.
                </p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}
  
export default connect(mapStateToProps)(Booking)
