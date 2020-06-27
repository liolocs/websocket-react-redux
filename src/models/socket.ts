export type Socket = null | WebSocket;

export type SocketMessage = {
  result: string;
  teams: [string, string];
};

export interface SocketConnection {
  host: string;
}

export interface SocketState {
	connections: SocketConnection[];
}