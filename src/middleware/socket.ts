import { wConnect, wDisconnect } from '../store/socket';
import { processGameResult } from '../store/teams';
import { Middleware, MiddlewareAPI, AnyAction } from 'redux';
import { Dispatch } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { Socket } from '../models/socket';

const socketMiddleware: Middleware = (api: MiddlewareAPI) => {
  let socket: Socket = null;
  const { dispatch } = api;

  return (next: Dispatch<AnyAction>) => (action: PayloadAction<string>) => {
    switch (action.type) {
      case wConnect.toString():
        connectSocket(socket, action, dispatch);
        break;
      case wDisconnect.toString():
        disconnectSocket(socket);
        break;
      default:
        return next(action);
    }
  };
};

const connectSocket = (socket: Socket, action: PayloadAction<string>, dispatch: Dispatch<AnyAction>) => {
  if (socket !== null) {
    socket.close();
  }

  socket = new WebSocket(action.payload);
  socket.onopen = () => {
    socket!.send(subscribe);
  };
  socket.onmessage = onMessage(dispatch);
};

const onMessage = (dispatch: Dispatch<AnyAction>) => (event: any) => {
  const payload = JSON.parse(event.data).data;

  dispatch(processGameResult(payload));
};

const subscribe = JSON.stringify({
  type: 'subscribeToResults',
});

const disconnectSocket = (socket: Socket) => {
  if (socket !== null) {
    socket.close();
  }
};

export default socketMiddleware;
