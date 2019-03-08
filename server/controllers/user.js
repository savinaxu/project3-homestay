const User = require("../models/user")
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = function (req, res) {
    const { email, password } = req.body;

    if (!password || !email) {
        return res.status(422).send({
            errors: [{
                title: 'Data missing!',
                detail: 'Provide email and password!'
            }]
        });
    }

    User.findOne({email}, function (err, user) {
        if (err) {
            return res.status(422).send({
                errors: normalizeErrors(err.errors)
            });
        }

        if (!user) {
            return res.status(422).send({
                errors: [{
                    title: 'Invalid User!',
                    detail: 'User does not exist'
                }]
            });
        }

        if (user.hasSamePassword(password)) {
            const token = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.SECRET, {
                expiresIn: '1h'
            });

            return res.json(token);
        } else {
            return res.status(422).send({
                errors: [{
                    title: 'Wrong Data!',
                    detail: 'Wrong email or password'
                }]
            });
        }
    });
}

exports.register = function (req, res) {
    const {
        username,
        email,
        password,
        passwordConfirmation
    } = req.body;

    if (!password || !email) {
        return res.status(422).send({
            errors: [{
                title: 'Data missing!',
                detail: 'Provide email and password!'
            }]
        })
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({
            errors: [{
                title: 'Invalid password!',
                detail: 'Password is not as same as confirmation!'
            }]
        })
    }

    User.findOne({
        email
    }, function (err, existingUser) {
        if (err) {
            return res.status(422).send({
                errors: normalizeErrors(err.errors)
            })
        }

        if (existingUser) {
            return res.status(422).send({
                errors: [{
                    title: 'Invalid email!',
                    detail: 'Email already exists!'
                }]
            })
        }

        const user = new User({
            username,
            email,
            password
        })

        user.save(function (err) {
            if (err) {
                return res.status(422).send({
                    errors: normalizeErrors(err.errors)
                })
            }

            return res.json({
                "registered": true
            })
        })
    })
}