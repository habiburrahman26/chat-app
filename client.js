const net = require('net');
const readline = require('node:readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx.dy);
  });
};

const socket = net.createConnection(
  {
    port: 3008,
    host: '127.0.0.1',
  },
  async () => {
    console.log('Connected to the server');

    const ask = async () => {
      moveCursor(0, -1);
      clearLine(0);
      const message = await rl.question('Enter a message > ');
      socket.write(message);
    };

    ask();

    socket.on('data', (data) => {
      console.log()
      moveCursor(0,-1);
      clearLine(0)
      console.log(data.toString('utf-8'));
      ask()
    });
  }
);



socket.on('end', () => {
  console.log('connection end');
});
