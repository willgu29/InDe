var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  contentPiece: String,
  pictureURLS: [String],
  author_fullName: String,
  author_id: mongoose.Schema.Types.ObjectId,
  dateCreated: {type: Date, default: Date.now},

});

module.exports = Project = mongoose.model('Project', projectSchema);
