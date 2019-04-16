const WebsiteStorageModel = require('../models/websiteStorage.model');
const UseTrackModel = require('../models/useTrack.model');

exports.findingTests = (req, res, next) => {
	const id = req.params.id;
	WebsiteStorageModel.findById(id)
		.then(item => {
			!item ? res.status(500).send({ err: 'Cant find item'}) : res.send({
				"tests": item.testArray
			})
		})
		.catch(err => console.log(err));
}

exports.findingOneTest = (req, res, next) => {
	const id = req.params.id;
	UseTrackModel.findById(id)
		.then(item => {
			// use item.initInformation.url to request a copy of the page, display that page to the user, and then use coords to replay
			res.send({
				"item": item
			})
		})
		.catch(err => console.log(err));
}