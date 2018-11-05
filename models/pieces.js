const mongoose = require('mongoose');
const { Schema } = mongoose;

const pieceSchema = new Schema(
	{
		//companss rose
		type: String,
		position: Array,
		material: String,
		wall: String,
		plot: {
			type: Schema.Types.ObjectId,
			ref: 'Plot'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Piece', pieceSchema);
