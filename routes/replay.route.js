const express = require('express');
const replayRouter = express.Router();

const replayController = require('../controllers/replay.controller');


function router() {

    replayRouter.route('/findOne/:id')
        .get(replayController.findingOneTest);

    replayRouter.route('/:id')
        .get(replayController.findingTests);

    return replayRouter;
}
module.exports = router;