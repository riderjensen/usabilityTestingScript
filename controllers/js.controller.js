exports.index = (req, res, next) => {
    res.send('Return JS from here')
}

exports.postIndex = (req, res, next) => {
    res.send('Post information recieved')
}
