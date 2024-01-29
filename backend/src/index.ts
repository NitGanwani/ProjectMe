import { createServer } from 'http';
import dbConnect from './config/db.js';
import { app } from './app.js';

const server = createServer(app);
const PORT = process.env.PORT || 7000;

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    console.log('Connected to DB:', mongoose.connection.db.databaseName);
  })
  .catch((error) => server.emit('error', error));

server.on('listening', () => {
  console.log('Listening on port', PORT);
});

server.on('error', (error) => {
  console.log(`Error ${error.message}`);
});
