var express = require('express');
var socket = require('socket.io');

// Configuración de la app
var app = express();
var server = app.listen(process.env.PORT || 4000, function() {
    console.log('listening to requests on port 4000');
});

// Archivos estáticos
app.use(express.static('public'));

// Configuración de socket.io
var io = socket(server);

io.on('connection', function(socket) {
    console.log('made socket connection', socket.id);

    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });

    // Manejar evento de escritura
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});
