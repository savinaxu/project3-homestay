const Booking = require('../models/booking');
const Rental = require('../models/rental');

const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

const config = require('../config');

const CUSTOMER_SHARE = 0.8;

exports.createBooking = function(req, res) {
    // const { startAt, endAt, totalPrice, guests, days, rental, paymentToken } = req.body;
    res.json({"booking":"ok"})

}