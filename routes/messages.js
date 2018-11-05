const express = require('express');
const { Router } = express;

const Message = require('../models/messages');
const messageRouter = Router();

messageRouter
	.route('/')
	.get((req, res, next) => {
		//ask the database for the right data and send it to the client
		Message.find({}, (err, messages) => {
			if (err) {
				res.status(400);
				next(err);
			} else {
				res.status(200).send(messages);
			}
		});
	})
	.post((req, res, next) => {
		// convert request body into a document
		const newMessage = new Message(req.body);
		//save the document to the collection (model)
		newMessage.save((err, savedMessage) => {
			if (err) {
				res.status(400);
				next(err);
			} else {
				res.status(201).send(savedMessage);
			}
		});
	});

module.exports = messageRouter;
