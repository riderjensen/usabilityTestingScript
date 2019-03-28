const express = require('express');
const homeRouter = express.Router();

const homeController = require('../controllers/home.controller');

function router() {

    homeRouter.route('/')
        .get(homeController.index);

    return homeRouter;
}
module.exports = router;