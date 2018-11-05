const mongoose = require('mongoose');
const { Schema } = mongoose;

const plotSchema = new Schema({
	name: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Plot', plotSchema);
