var mongoose = require('mongoose');

var acquaintanceSchema = new mongoose.Schema({
	fullName: String,
	dateCreated: {type: Date, default: Date.now},
	hasAccount: Boolean,
	account_id: String,


});


var knownNetworkSchema = new mongoose.Schema({
	user_id: String,
	dateCreated: {type: Date, default: Date.now},
	dateLastUpdated: Date,
    knownAquaintances: [acquaintanceSchema],

});

module.exports = KnownNetwork = mongoose.model('KnownNetwork', knownNetworkSchema);