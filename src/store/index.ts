import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import socketReducer from './socket';
import teamsReducer from './teams';
import socketMiddleware from '../middleware/socket';

const store = configureStore({
  reducer: {
    socket: socketReducer,
    teams: teamsReducer,
  },
  middleware: getDefaultMiddleware().concat(socketMiddleware)
});

export default store;
