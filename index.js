var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a client connected');
  socket.join('roomid');

  socket.on('disconnect', function(){
    console.log('a client disconnected');
    console.log('socket leaves room automatically on disconnect');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
  setInterval(intervalFunction, 1000);
});


// simulate activity
function intervalFunction(){
  console.log('emitting message data to roomid');
  io.to('roomid').emit('message name', 'message data');
};
