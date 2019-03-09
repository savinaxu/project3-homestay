
const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
// const User = require('../models/user');
const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
    res.json({"secret": true});
});

router.get('', function(req, res) {
    // const city = req.query.city;
    // const query = city ? {city: city.toLowerCase()} : {};
  
    Rental.find({})
          .select('-bookings')
          .exec(function(err, foundRentals) {
  
                if (err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }
            
                // if (city && foundRentals.length === 0) {
                //     return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `There are no rentals for city ${city}`}]});
                // }
            
                return res.json(foundRentals);
            });
});
  

router.get('/:id', function(req, res) {
    const rentalId = req.params.id


    Rental.findById(rentalId)
          .populate('user', 'username -_id')
          .populate('bookings', 'startAt endAt -_id')
          .exec(function(err, foundRental) {
                if (err || !foundRental) {
                    return res.status(422).send({
                        errors: [{
                            title: 'Rental Error!',
                            detail: 'Could not find Rental!'
                        }]
                    })
                }
                return res.json(foundRental)
            })
})


module.exports = router;