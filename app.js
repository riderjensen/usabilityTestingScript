const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false,
    useNewUrlParser: true
}));

const jsRouter = require('./routes/js.route')();
app.use('/js', jsRouter);

const replayRouter = require('./routes/replay.route')();
app.use('/replay', replayRouter)

const homeRouter = require('./routes/home.route')();
app.use('/', homeRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})