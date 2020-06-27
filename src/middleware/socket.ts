import { wConnect, wDisconnect } from '../store/socket';
import { Middleware, MiddlewareAPI } from 'redux';
import { Dispatch } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { Socket } from '../models/socket';
import { handleTeamUpdate } from '../store/teams/index';

const socketMiddleware: Middleware = (api: MiddlewareAPI) => {
  let socket: Socket = null;
  const { dispatch } = api;

  return (next: Dispatch<any>) => (action: PayloadAction<string>) => {
    switch (action.type) {
      case wConnect.toString():
        connectSocket(socket, action, dispatch);
        next(action);
        break;
      case wDisconnect.toString():
        disconnectSocket(socket);
        next(action);
        break;
      default:
        return next(action);
    }
  };
};

const connectSocket = (socket: Socket, action: PayloadAction<string>, dispatch: Dispatch<any>) => {
  if (socket !== null) {
    socket.close();
  }

  socket = new WebSocket(action.payload);
  socket.onopen = () => {
    socket!.send(subscribe);
  };
  socket.onmessage = onMessage(dispatch);
};

const onMessage = (dispatch: Dispatch<any>) => (event: any) => {
  const payload = JSON.parse(event.data).data;

  dispatch(handleTeamUpdate(payload));
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
