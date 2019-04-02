const express = require('express');
const jsRouter = express.Router();

const jsController = require('../controllers/js.controller');


function router() {

    jsRouter.route('/:id')
        .post(jsController.addTracking)
        .get(jsController.replay);

    jsRouter.route('/')
        .post(jsController.postInit)
        .get(jsController.index);

    return jsRouter;
}
module.exports = router;