/// <reference path="../../index.d.ts" />

import d from 'debug';

const err = (statusCode, error, message) =>
  JSON.stringify({
    statusCode,
    error,
    message,
  });

/**
 * Handle websocket connections
 * @param {Context} ctx
 */
export default async function (ctx) {
  const { websocket, emitter, ips, ip, state } = ctx;
  const currentIp = ips.length > 0 ? ips[ctx.ips.length - 1] : ip;
  const wsDebug = d(`interview-server:ws:${currentIp}`);

  state.subscribed = false;

  wsDebug('connected');
  const subscription = (event) =>
    websocket.send(
      JSON.stringify({
        type: 'gameResult',
        data: event,
      })
    );

  websocket.onmessage = (e) => {
    let data = null;

    try {
      data = JSON.parse(e.data);
    } catch (e) {
      wsDebug('failed to parse JSON message');
      wsDebug(e);
      websocket.send(
        err(500, 'internal server error', 'error while deserializing message')
      );
      websocket.close();
      return;
    }

    if (typeof data.type !== 'string') {
      wsDebug('invalid message format');
      websocket.send(err(400, 'invalid request', 'wrong message format'));
      websocket.close();
    }

    if (data.type === 'subscribeToResults') {
      if (!state.subscribed) {
        wsDebug('subscribed');
        state.subscribed = true;
        emitter.addListener('gameResult', subscription);
      } else {
        wsDebug('already subscribed');
      }
    } else {
      wsDebug('invalid server command');
      websocket.send(err(400, 'invalid request', `${data.type} not supported`));
      websocket.close();
    }
  };

  websocket.onclose = (_) => {
    wsDebug('disconnected');
    emitter.removeListener('gameResult', subscription);
  };
}
