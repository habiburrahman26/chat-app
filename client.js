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

let id;

const socket = net.createConnection(
  {
    port: 3008,
    host: '127.0.0.1',
  },
  async () => {
    console.log('Connected to the server');

    const ask = async () => {
      const message = await rl.question('Enter a message > ');
      moveCursor(0, -1);
      clearLine(0);
      socket.write(`${id}-message-${message}`);
    };

    ask();

    socket.on('data', (data) => {
      if (data.toString('utf-8').substring(0, 2) === 'id') {
        id = data.toString('utf-8').substring(3);
        console.log(`Your id is: ${id}! \n`);
      } else {
        console.log();
        moveCursor(0, -1);
        clearLine(0);
        console.log(data.toString('utf-8'));
      }

      ask();
    });
  }
);

socket.on('end', () => {
  console.log('connection end');
});
