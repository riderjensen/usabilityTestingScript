const WebsiteStorageModel = require('../models/websiteStorage.model');
const UseTrackModel = require('../models/useTrack.model');

exports.findingTests = (req, res, next) => {
    const id = req.params.id;
    WebsiteStorageModel.findById(id)
        .then(item => {
            res.send({
                "tests": item.testArray
            })
        })
        .catch(err => console.log(err));
}

exports.findingOneTest = (req, res, next) => {
    const id = req.params.id;
    UseTrackModel.findById(id)
        .then(item => {
            res.send({
                "item": item
            })
        })
        .catch(err => console.log(err));
    // pull one ID and return something that replays the information
}