const WebsiteStorageModel = require('../models/websiteStorage.model');

exports.index = (req, res, next) => {
	res.send('Add documentation here for setting things up')
}

exports.generate = (req, res, next) => {
	const newWeb = new WebsiteStorageModel();
	newWeb.save().then(item => {
		res.send({
			url: `${process.env.ADDR}/js?id=${item._id}`
		});
	})
		.catch(err => console.log(err))

}