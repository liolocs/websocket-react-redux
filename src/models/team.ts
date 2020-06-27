export interface Team {
  name: string;
  points: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  goalsScored: number;
}

export interface TeamState {
  [key: string]: Team;
}

export interface TeamResult {
  id: string;
  points: number;
  goalsScored: number;
  wins: number;
  losses: number;
}
