const net = require('net');

const socket = net.createConnection(
  {
    port: 3008,
    host: '127.0.0.1',
  },
  () => {
    console.log('Connected to the server');
  }
);

socket.on('end', () => {
  console.log('connection end');
});
