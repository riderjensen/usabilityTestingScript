const UseTrackModel = require('../models/useTrack.model');
const WebsiteStorageModel = require('../models/websiteStorage.model');

exports.index = (req, res, next) => {
    const options = {
        root: './public/js/',
    };
    res.sendFile('recMove.js', options, (err) => {
        err ? console.log(err) : null
    })
}

exports.replay = (req, res, next) => {
    const options = {
        root: './public/js/',
    };
    res.sendFile('replayMove.js', options, (err) => {
        err ? console.log(err) : null
    })
}

exports.postInit = (req, res, next) => {
    const mainId = req.body.overallId;
    const initInfo = req.body;
    const newModel = new UseTrackModel;
    newModel.initInformation = initInfo;
    newModel.save().then(resp => {
        res.status(200).send({
            id: resp._id
        })
        WebsiteStorageModel.findById(mainId).then(item => {
            item.testArray.push(resp._id);
            item.save();

        })
    }).catch(err => console.log(err))

}

exports.addTracking = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    UseTrackModel.findByIdAndUpdate(id, {
        "$push": {
            'recMoves': {
                $each: data.recMoves
            }
        }
    }, (err, item) => res.status(201).send({
        message: "Items have been added"
    }))
}
