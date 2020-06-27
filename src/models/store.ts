import { TeamState } from './team';
import { SocketState } from './socket';

export type StoreState = {
  teams: TeamState;
  socket: SocketState;
};
