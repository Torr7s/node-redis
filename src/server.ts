import http from 'node:http';
import app from './app';

http.createServer(app).listen(3000, (): void => {
  console.log(
    'Server running successfully.'
  );
});