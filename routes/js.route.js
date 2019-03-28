const express = require('express');
const jsRouter = express.Router();

const jsController = require('../controllers/js.controller');


function router() {

    jsRouter.route('/')
        .post(jsController.postIndex)
        .get(jsController.index);

    return jsRouter;
}
module.exports = router;