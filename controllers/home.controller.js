const WebsiteStorageModel = require('../models/websiteStorage.model');

exports.index = (req, res, next) => {
	res.send('Add documentation here for setting things up')
}

exports.generate = (req, res, next) => {
	const newWeb = new WebsiteStorageModel();
	req.body.questionArray ? newWeb.questions = req.body.questionArray : null;
	newWeb.save().then(item => {
		res.send({
			url: `https://intense-plains-47179.herokuapp.com/js?id=${item._id}`
		});
	})
		.catch(err => console.log(err))

}