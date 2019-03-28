exports.index = (req, res, next) => {
    const options = {
        root: './public/',
    };

    res.sendFile('recMove.js', options, (err) => {
        err ? console.log(err) : null
    })
}


exports.postIndex = (req, res, next) => {
    console.log(req.body);
    res.send('Post information recieved')
}
