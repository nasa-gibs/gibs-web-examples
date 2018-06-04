#!/usr/bin/env node

var express = require('express');
var path = require('path');
var port = process.env.PORT || 3001;

var app = express();

app.use(express.static(path.join(__dirname, '..')));
app.set('port', port);
app.listen(port, function () {
  console.log('gibs-web-examples is available at http://localhost:' + port);
});
