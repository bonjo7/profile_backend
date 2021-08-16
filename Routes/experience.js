const express = require('express')
let app = express.Router()

app.get('/', function (req, res) {
    res.send('ToDo Experience');
});

module.exports = app