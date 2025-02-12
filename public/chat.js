// Establecer la conexión con el servidor usando la URL de Render
var socket = io.connect(window.location.hostname);  // Cambiado para usar la URL del servidor

// Consultar el DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emitir el evento 'chat' cuando el botón "Send" es presionado
btn.addEventListener('click', function() {
    var msg = message.value.trim();  // Verificar que no esté vacío
    var userHandle = handle.value.trim();  // Verificar que no esté vacío

    if (msg !== "" && userHandle !== "") {
        socket.emit('chat', {
            message: msg,
            handle: userHandle
        });
        message.value = "";  // Limpiar el campo de mensaje después de enviar
    } else {
        alert("Por favor, ingresa un mensaje y un nombre de usuario.");
    }
});

// Emitir 'typing' cuando el usuario está escribiendo
message.addEventListener('keypress', function() {
    var userHandle = handle.value.trim();
    if (userHandle !== "") {
        socket.emit('typing', userHandle);
    }
});

// Escuchar el evento 'chat' desde el servidor y agregarlo al DOM
socket.on('chat', function(data) {
    console.log(data);  // Verificar si los datos llegan al cliente
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

// Escuchar el evento 'typing' para mostrar quién está escribiendo
socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' está escribiendo...</em></p>';
});
