const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const url = 'mongodb://127.0.0.1:27017/soldierList';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });

const soldiersRouter = require('./routes/soldiers');
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Resource-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    console.log("requst url = " + req.url);
    next();
});
app.use('/soldiers', soldiersRouter);

const db = mongoose.connection;
db.once('open', function () {
    console.log('DB connected');
});

app.listen(port, () => {
    console.log(`Express server is running on port: ${port}`)
});