var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	event_id: mongoose.Schema.Types.ObjectId,
	dateCreated: {type: Date, default: Date.now},
	name: String,
	description: String,
    startTime: String, //to be changed to Date later...
    endTime: String,
    status: String, //PRE, IN PROGRESS, ENDED
    peopleInvited_fullNames: [String],
    peopleInvited_ids: [mongoose.Schema.Types.ObjectId],
    peopleAttending_fullNames: [String],
    peopleAttending_ids: [mongoose.Schema.Types.ObjectId],
    peopleNotAttending_fullNames: [String],
    peopleNotAttending_ids: [mongoose.Schema.Types.ObjectId],

});

module.exports = Event = mongoose.model('Event', eventSchema);