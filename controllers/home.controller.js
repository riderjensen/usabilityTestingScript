const shortid = require('shortid');

exports.index = (req, res, next) => {
    res.send('Home area, generate script tag')
}

exports.generate = (req, res, next) => {
    let id = shortid.generate();
    res.send({
        url: `${process.env.ADDR}/js?id=${id}`
    });
}