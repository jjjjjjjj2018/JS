const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const listsRouter = require('./routes/lists');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Resource-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    console.log("requst url = " + req.url);
    next();
})
app.use('/lists', listsRouter);

app.listen(port, () => {
    console.log(`Express server is running on port: ${port}`)
});