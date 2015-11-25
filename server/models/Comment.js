var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	user_id: mongoose.Schema.Types.ObjectId,
	dateCreated: {type: Date, default: Date.now},
    rating: Number,
    text: String,
    isAnonymous: Boolean,
    byUser_id: mongoose.Schema.Types.ObjectId,
    authorFullName: String,

});

module.exports = Comment = mongoose.model('Comment', commentSchema);