const Booking = require('../models/booking');
const Rental = require('../models/rental');

const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

const config = require('../config');

const CUSTOMER_SHARE = 0.8;

exports.createBooking = function(req, res) {
    const { startAt, endAt, totalPrice, guests, days, rental, paymentToken } = req.body;
    const user = res.locals.user;

    const booking = new Booking({ startAt, endAt, totalPrice, guests, days});

    Rental.findById(rental._id)
          .populate('bookings')
          .populate('user')
          .exec(async function(err, foundRental) {
              console.log(rental._id, foundRental)
              if (err) {
                  return res.status(422).send({errors: normalizeErrors(err.errors)});
              }
            
              if (foundRental.user.id === user.id) {
                  return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
              }

              return res.json({booking, foundRental})
           })
}