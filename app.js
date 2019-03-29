const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT;

app.use(express.static(`public`));
app.use(cors());

app.use(bodyParser.urlencoded({
	extended: false,
	useNewUrlParser: true
}));
app.use(bodyParser.json());

const jsRouter = require('./routes/js.route')();
app.use('/js', jsRouter);

const replayRouter = require('./routes/replay.route')();
app.use('/replay', replayRouter)

const homeRouter = require('./routes/home.route')();
app.use('/', homeRouter);

mongoose.connect('mongodb+srv://scrimscram:12345678Ah!@nodecourse-zfafv.mongodb.net/usabilityTestingScript?retryWrites=true', {
	useNewUrlParser: true
}).then(_ => {
	app.listen(PORT, () => console.log(`App is running on ${PORT}`));

}).catch(err => console.log(`Cant connect to the DB because ${err}`))

	// run db 
    // mongod --dbpath "C:\Program Files\MongoDB\data"