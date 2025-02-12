const express = require('express');
const socket = require('socket.io');

const app = express();

// Usar el puerto que asigna Render o 4000 por defecto (para pruebas locales)
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, function () {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Archivos estáticos (asegúrate de que existe la carpeta "public")
app.use(express.static('public'));

// Configuración de WebSockets
const io = socket(server);

io.on('connection', function (socket) {
    console.log('Nueva conexión de socket:', socket.id);

    // Escuchar mensajes de chat
    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    });

    // Manejar desconexiones
    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
    });
});
