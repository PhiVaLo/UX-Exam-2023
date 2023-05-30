const express = require('express')
const {ApiRouter} = require("./api/ApiRouter");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(new ApiRouter().getRouter());


app.listen(port);