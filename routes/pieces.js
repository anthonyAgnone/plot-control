const express = require('express');

const { Router } = express;

const Piece = require('../models/pieces');
const pieceRouter = Router();

pieceRouter
	.route('/')
	.get((req, res, next) => {
		//ask the database for the right data and send it to the client
		Piece.find(req.query, (err, pieces) => {
			if (err) {
				res.status(400);
				next(err);
			} else {
				res.status(200).send(pieces);
			}
		});
	})
	.post((req, res, next) => {
		// convert request body into a document
		const newPiece = new Piece(req.body);
		//save the document to the collection (model)
		newPiece.save((err, savedPiece) => {
			if (err) {
				res.status(400);
				next(err);
			} else {
				res.status(201).send(savedPiece);
			}
		});
	});

pieceRouter
	.route('/:id')
	.get((req, res) => {
		Piece.findById(req.params.id, (err, foundPiece) => {
			if (err) {
				res.status(400);
				next(err);
			} else {
				res.status(200).send(foundPiece);
			}
		});
	})
	.put((req, res) => {
		Piece.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, editedPiece) => {
			if (err) {
				res.status(400);
				next(err);
			} else {
				res.status(200).send(editedPiece);
			}
		});
	})
	.delete((req, res, next) => {
		Piece.findByIdAndDelete(req.params.id, (err, deletedPiece) => {
			if (err) {
				res.status(400);
				next(err);
			} else {
				res.status(204).send(deletedPiece);
			}
		});
	});

pieceRouter.route('/login').post((req, res, next) => {
	const plot = req.body.id;
	const query = {
		plot
	};
	Piece.find({ query }, (err, pieces) => {
		if (err) {
			res.status(400);
			next(err);
		} else {
			res.status(200).send(pieces);
		}
	});
});

module.exports = pieceRouter;
