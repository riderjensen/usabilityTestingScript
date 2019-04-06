const express = require('express');
const homeRouter = express.Router();

const answerQuestionController = require('../controllers/answerQuestion.controller');

function router() {

    homeRouter.route('/')
        .post(answerQuestionController.answer)

    return homeRouter;
}
module.exports = router;