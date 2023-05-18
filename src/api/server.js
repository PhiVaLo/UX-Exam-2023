const express = require('express')
const {ApiRouter} = require("./ApiRouter");
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(new ApiRouter().getRouter());


app.listen(port);