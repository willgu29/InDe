var mongoose = require('mongoose');

var mediaSchema = new mongoose.Schema({
	user_id: mongoose.Schema.Types.ObjectId,
	dateCreated: {type: Date, default: Date.now},
    mediaType: String,
    extensionType: String,
    mediaLink: String,
    displayOnProfile: Boolean

});

module.exports = Media = mongoose.model('Media', mediaSchema);