/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */

var express = require('express');
var expressWs = require('express-ws');
var path = require('path');

function startServer() {
  var app = express();
  expressWs(app);

  app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
  app.get('/xterm.css', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'node_modules/xterm/lib/xterm.css')));
  app.get('/client-bundle.js', (req, res) => res.sendFile(__dirname + '/dist/client-bundle.js'));

  var port = process.env.PORT || 3000;
  var host = '127.0.0.1';

  console.log('App listening to http://127.0.0.1:' + port);
  app.listen(port, host);
}

module.exports = startServer;
