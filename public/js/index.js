var socket = io();

socket.on('connect', function(){
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'Hey. This is Itay.'
  // });


});

socket.on('disconnect', function(){
  console.log('Disconnected from the server');
});


// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });


socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
