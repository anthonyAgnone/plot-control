const express = require('express');
const { Router } = express;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/users');

const userRouter = Router();

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
userRouter.get('/logintest', (req, res) =>
	res.json({
		msg: 'Users Works'
	})
);

// @route   GET api/users/register
// @desc    Register a user
// @access  Public
userRouter.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({
		email: req.body.email
	}).then(user => {
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT Toeken
// @access  Public
userRouter.post('/logintest', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({
		email
	}).then(user => {
		// Check for user
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}

		// Check Password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User matched
				const payload = {
					id: user.id,
					name: user.name
				};
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 3600
					},
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

userRouter.route('/current/:id').put((req, res) => {
	console.log(req.params.id);
	User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, editedUser) => {
		if (err) {
			res.status(400);
			next(err);
		} else {
			res.status(200).send(editedUser);
		}
	});
});

userRouter.route('/login').post((req, res, next) => {
	var email = req.body.email;
	var password = req.body.password;
	console.log(email, password);
	User.findOne({ email }, (err, user) => {
		if (password === user.password) {
			return res.status(200).send(user);
		} else return res.status(200).send('password incorrect');
	});
});

module.exports = userRouter;
