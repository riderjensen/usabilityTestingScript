exports.findingTests = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    // use model to find associated tests then return JSON with a list of IDs
}

exports.findingOneTest = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    // pull one ID and return something that replays the information
}