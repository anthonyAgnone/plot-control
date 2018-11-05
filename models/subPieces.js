const mongoose = require('mongoose');
const { Schema } = mongoose;

const subPieceSchema = new Schema(
	{
		type: String,
		createdTick: Number,
		piece: {
			type: Schema.Types.ObjectId,
			ref: 'Piece'
		},
		plot: {
			type: Schema.Types.ObjectId,
			ref: 'Plot'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('subPiece', subPieceSchema);
