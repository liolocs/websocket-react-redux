import Koa from 'koa';
// eslint-disable no-unused-vars
// We need to tell typescript these are loaded, so it knows how to enhance Koa's context
import websockify from 'koa-websocket';
import logger from 'koa-logger';
import * as ws from 'ws';
// eslint-enable no-unused vars

import EventEmitter from 'eventemitter3';

import debug from 'debug';

declare module 'koa' {
  interface DefaultContext {
    gameResults: { result: GameResult; time: number }[];
    emitter: EventEmitter;
    websocket: ws;
    path: string;
  }
}

// We're not using Flow or Typescript in the sourceode, in case candidates are
// not familiar with them, but we add TS as an "auxiliary" feature so that IDEs
// can make use of it
declare global {
  // Aliased for convenience
  type Next = Koa.Next;
  type Context = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>;

  /**
   * A competitor represents either a team or a person participating in an event
   */
  interface Competitor {
    id: string;
    name: string;
    strength: number;
  }

  /**
   * Represents the result of a finished game
   */
  interface GameResult {
    // The two team IDs. First ID is the home team, second ID is the away team.
    teams: [string, string];

    // The result formatted as a `{home score} - {away score}`
    result: string;
  }
}
