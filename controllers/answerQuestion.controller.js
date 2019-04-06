const UseTrackModel = require('../models/useTrack.model');

exports.answer = (req, res, next) => {
    UseTrackModel.findById(req.body.testId).then(item => {
        item.questionsAnswered = {
            question: req.body.question,
            answer: req.body.answer
        }
        item.save().then(_ => {
            res.status(201).send({
                message: 'Question saved'
            })
        })
    }).catch(err => {
        res.send(500).send({
            message: 'An issue occured while saving the information'
        })
    })
}