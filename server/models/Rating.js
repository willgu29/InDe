var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
	user_id: mongoose.Schema.Types.ObjectId,
	dateCreated: {type: Date, default: Date.now},
    rating: Number,
    comment: String,
   	byUser_id: mongoose.Schema.Types.ObjectId,

});

module.exports = Rating = mongoose.model('Rating', ratingSchema);