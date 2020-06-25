export type Socket = null | WebSocket;

export type SocketMessage = {
  result: string;
  teams: [string, string];
};
