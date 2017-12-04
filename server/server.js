const path = require ('path');
const http = require('http');
const express = require('express');
const socketIO = require ('socket.io');
const {generateMessage} = require ('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) =>{
  console.log('New user connected')

  //socket.emit from Admin text Welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  //socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined'));

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   test: 'Hey, how are you todat?',
  //   createdAt: 123
  // });

   socket.on('createMessage', (message) =>{
     console.log ('message created', message);
     io.emit('newMessage', generateMessage(message.from, message.text));
     // socket.broadcast.emit('newMessage',{
     //   from: message.from,
     //   text: message.text,
     //   createdAt: new Date().getTime()
     // });
   });

  socket.on('disconnect', () =>{
    console.log ('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
