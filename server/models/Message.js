var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
	user_id: mongoose.Schema.Types.ObjectId,
	fullName: String,
	text: String,
	toMessageThread_id: mongoose.Schema.Types.ObjectId,
	dateCreated: {type: Date, default: Date.now},

});

module.exports = Message = mongoose.model('Message', messageSchema);
