import { createSlice } from '@reduxjs/toolkit';
import { SocketConnection, SocketState } from '../models/socket';

const initialState: SocketState = {
  connections: [],
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    wConnect(state, action) {
      if (findConnectionIndex(state, action.payload) === -1) {
        state.connections.push(action.payload);
      }
    },
    wDisconnect(state, action) {
      const index = findConnectionIndex(state, action.payload);
      if (index > 0) {
        state.connections.splice(index, 1);
      }
    },
  },
});

const findConnectionIndex = (state: SocketState, payload: string) =>
  state.connections.findIndex((val: SocketConnection) => val.host === payload);

const { actions, reducer } = socketSlice;

export const { wConnect, wDisconnect } = actions;
export default reducer;
