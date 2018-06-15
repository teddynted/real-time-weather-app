const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const http = require('http');
const socketio = require('socket.io');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

const server = http.createServer(app);
const io = socketio(server);

const routes = require('./routes/index')(io);
app.use('/', routes);

var port = 9000;

server.listen(port, function() {
   console.log('running at localhost: ' + port);
});