// Establecer la conexión con el servidor de producción
var socket = io.connect('https://chatentiemporeal.onrender.com'); // Cambia esta URL

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emitir evento
btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

// Evento de escritura
message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
});

// Escuchar eventos
socket.on('chat', function(data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' esta escribiendo...</em></p>';
});

