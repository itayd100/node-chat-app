const path = require ('path');
const http = require('http');
const express = require('express');
const socketIO = require ('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) =>{
  console.log('New user connected')

  socket.emit('newEmail', {
    from: 'mike@example.com',
    test: 'Hey, how are you todat?',
    createAt: 123
  });

   socket.emit('newMessage', {
     from: 'Itay',
     test: 'Hey you!',
     createAt: 123123
   });

   socket.on('createMessage', (message) =>{
     console.log ('message created', message);
   })

  socket.on('disconnect', () =>{
    console.log ('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
