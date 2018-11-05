const express = require('express');

const { Router } = express;

const SubPiece = require('../models/subPieces');
const subPieceRouter = Router();

subPieceRouter
	.route('/')
	.get((req, res, next) => {
		//ask the database for the right data and send it to the client
		SubPiece.find(req.query, (err, subPieces) => {
			if (err) {
				res.status(400);
				next(err);
			} else {
				res.status(200).send(subPieces);
			}
		});
	})
	.post((req, res, next) => {
		// convert request body into a document
		const newSubPiece = new SubPiece(req.body);
		//save the document to the collection (model)
		newSubPiece.save((err, savedSubPiece) => {
			if (err) {
				res.status(400);
				next(err);
			} else {
				res.status(201).send(savedSubPiece);
			}
		});
	});

subPieceRouter
	.route('/:id')
	.get((req, res) => {
		SubPiece.findById(req.params.id, (err, foundSubPiece) => {
			if (err) {
				res.status(400);
				next(err);
			} else {
				res.status(200).send(foundSubPiece);
			}
		});
	})
	.delete((req, res, next) => {
		SubPiece.findByIdAndDelete(req.params.id, (err, deletedSubPiece) => {
			if (err) {
				res.status(400);
				next(err);
			} else {
				res.status(204).send(deletedSubPiece);
			}
		});
	});

subPieceRouter.route('/login').post((req, res, next) => {
	const plot = req.body.id;
	const query = {
		plot
	};
	SubPiece.find(query, (err, subPieces) => {
		if (err) return res.status(500).send(err);
		return res.status(200).send(subPieces);
	});
});

module.exports = subPieceRouter;
