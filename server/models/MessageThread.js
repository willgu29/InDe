var mongoose = require('mongoose');


var messageThreadSchema = new mongoose.Schema({
	messageThread_id: mongoose.Schema.Types.ObjectId,  //as _id
	user_id: mongoose.Schema.Types.ObjectId, //person who started thread
	fullName: String,
	dateCreated: {type: Date, default: Date.now},
	dateLastUpdated: Date, //last message sent
    participant_ids: [mongoose.Schema.Types.ObjectId], //add user_id as well (person who started)
    participant_fullNames: [String],
    participant_emails: [String],
    messageCount: Number,
    unseenMessagesCount: Number,


});

module.exports = MessageThread = mongoose.model('MessageThread', messageThreadSchema);