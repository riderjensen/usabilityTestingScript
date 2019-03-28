const mongoose = require('mongoose');
const {
	Schema
} = mongoose;

// associated id connects to projects in userStorage.projects array

const useTrack = new Schema({
	initInformation: Object,
	// array of objects that we continuously push on to
	recMoves: {
		type: Array,
		Object: {
			type: Object,
			cursorPoints: {
				type: Array
			}
		}
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});
module.exports = mongoose.model("userTracking", useTrack);