const net = require('net');

const server = net.createServer();

const clients = [];

server.on('connection', (socket) => {
  console.log('A new connection to the server');

  const clientId = clients.length + 1;

  socket.write(`id-${clientId}`);

  clients.map(c=>{
    c.socket.write(`User ${clientId} joined`)
  })

  socket.on('data', (data) => {
    const dataString = data.toString('utf-8');
    const id = dataString.substring(0, dataString.indexOf('-'));
    const message = dataString.substring(dataString.indexOf('-message-') + 9);

    clients.map((s) => {
      s.socket.write(`> User ${id} : ${message}`);
    });
  });

  clients.push({ id: clientId.toString(), socket });

  socket.on('end',()=>{
    clients.map(c=>{
      c.socket.write(`User ${clientId} left`)
    })
  })
});

server.listen(3008, '127.0.0.1', () => {
  console.log('server is running on', server.address());
});
