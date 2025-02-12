var express = require('express')
var socket = require('socket.io')
//app setup
var app = express();
var server = app.listen(4000,function(){
    console.log('listening to request on prt 4000');
});

//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection',function(socket){
    console.log('made socket connection',socket.id)

    socket.on('chat',function(data){
        io.sockets.emit('chat',data); 

});



// Handle typing event
socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });

});