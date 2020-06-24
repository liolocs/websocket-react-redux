/// <reference path="../index.d.ts" />
import server from './server.js';
import chalk from 'chalk';

const SERVER_PORT = parseInt(process.env.SERVER_PORT) || 9000;
const SERVER_HOST = process.env.SERVER_HOST || '0.0.0.0';

server.listen(SERVER_PORT, SERVER_PORT);
console.log(chalk`Listening on {cyan http://%s:%d}`, SERVER_HOST, SERVER_PORT);
