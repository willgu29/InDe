var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
	group_id: mongoose.Schema.Types.ObjectId,
	dateCreated: {type: Date, default: Date.now},
	name: String,
    shortName: String,
	description: String,
    membershipModel: String,
    userIds_inGroup: [mongoose.Schema.Types.ObjectId],
    fullNames_inGroup: [String],
    emails_inGroup: [String],
    adminIds: [String],
    adminFullNames: [String],
    rootGroup_id: mongoose.Schema.Types.ObjectId,
    rootGroup_name: String,
    childrenGroup_ids: [mongoose.Schema.Types.ObjectId],
    childrenGroup_names: [String],
    level: Number, //if 1 == root
    category: String, //all lowercase 
    urls: [String]
});

module.exports = Group = mongoose.model('Group', groupSchema);