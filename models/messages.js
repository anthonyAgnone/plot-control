const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema(
	{
		user: String,
		body: String
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
