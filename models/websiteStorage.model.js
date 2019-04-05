const mongoose = require('mongoose');
const {
	Schema
} = mongoose;

const websiteStorage = new Schema({
	testArray: Array,
	questions: Array,
	createdAt: {
		type: Date,
		default: Date.now
	},
});
module.exports = mongoose.model("webStorage", websiteStorage);