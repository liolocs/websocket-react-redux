/// <reference path="../index.d.ts" />

import Koa from 'koa';
import websockify from 'koa-websocket';
import logger from 'koa-logger';
import route from 'koa-route';
import koaBetterErrorHandler from 'koa-better-error-handler';
import koa4040Handler from 'koa-404-handler';
import EventEmitter from 'eventemitter3';
import chalk from 'chalk';
import dbg from 'debug';

import { TEAMS } from './data.js';
import { decideWinner, shuffle, randomInt } from './helpers.js';

// Routes
import teamInfo from './routes/team-info.js';
import results from './routes/results.js';
import stream from './routes/stream.js';

// Server setup
const koa = new Koa();
const server = websockify(koa);
server.context.onerror = koaBetterErrorHandler;
server.context.gameResults = [];
server.context.emitter = new EventEmitter();
server.use(logger());
server.use(koa4040Handler);

// Attach the routes
server.use(route.get('/teams/:id', teamInfo));
server.use(route.get('/results', results));
server.ws.use(route.all('/stream', stream));

/**
 * Generate and emit a random game result
 * @param {Context} context
 */
function emitResult(context) {
  const debugGame = dbg('interview-server:game');

  const { emitter, gameResults } = context;
  const teams = shuffle(TEAMS).slice(0, 2);
  const winner = decideWinner(teams);

  // Let's try and generate a somewhat realistic score
  const loserScore = randomInt(0, 5);
  const winnerScore = randomInt(loserScore + 1, loserScore + 6);

  const score =
    winner === teams[0] ? [winnerScore, loserScore] : [loserScore, winnerScore];

  /** @type GameResult */
  const result = {
    teams: teams.map((team) => team.id),
    result: score.join(':'),
  };

  const debugParams = [teams[0].name, ...score, teams[1].name];

  if (winner === teams[0]) {
    debugGame(chalk`{cyan.bold %s} %d:%d %s`, ...debugParams);
  } else {
    debugGame(chalk`%s %d:%d {cyan.bold %s}`, ...debugParams);
  }

  gameResults.push({ result, time: Date.now() });
  emitter.emit('gameResult', result, context);
}

/**
 * Periodically run and clean games older than treshold.
 *
 * This is just for GC purposes, so the server doesn't leak memory.
 *
 * @param {Context} ctx
 * @param {number} treshold
 */
function cleanup(ctx, treshold) {
  const now = Date.now();

  while (ctx.gameResults.length && now - ctx.gameResults[0].time > treshold) {
    ctx.gameResults.shift();
  }
}

const resultInterval = parseInt(process.env.SERVER_STREAM_INTERVAL) || 10_000;
setInterval(emitResult, resultInterval, server.context);
setInterval(cleanup, 500, server.context, 600_000);

export default server;
