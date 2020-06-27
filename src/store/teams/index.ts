import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocketMessage } from '../../models/socket';
import { Team, TeamState, TeamResult } from '../../models/team';
import { StoreState } from '../../models/store';
import { getMatchResults, createNewTeams, updateTeams } from './utils';
import { Dispatch } from 'react';

const teamsSlice = createSlice({
  name: 'teams',
  initialState: {} as TeamState,
  reducers: {
    createTeam: {
      reducer: (state, action: PayloadAction<Team & { id: string }>) => {
        const { id, ...rest } = action.payload;
        state[id] = rest;
      },
      prepare: ({ id, name, points, wins, losses, goalsScored }) => {
        return {
          payload: {
            id,
            name,
            points,
            gamesPlayed: 1,
            wins,
            losses,
            goalsScored
          }
        };
      }
    },
    updateScore(state: any, action: PayloadAction<TeamResult & { gamesPlayed: number }>) {
      const { id, ...rest } = action.payload;
      state[id] = { ...state[id], ...rest };
    }
  }
});

export const handleTeamUpdate = (payload: SocketMessage) => async (dispatch: Dispatch<any>, getState: any) => {
  const { teams: currentTeams } = getState() as StoreState;
  const { teams: incomingTeams, result } = payload;

  const matchResults = getMatchResults(incomingTeams, result);
  const hasExistingTeams = Object.keys(currentTeams).length > 0;

  if (hasExistingTeams) {
    await updateTeams({ currentTeams, incomingTeams, matchResults }, dispatch);
  } else {
    await createNewTeams({ incomingTeams, matchResults }, dispatch);
  }
};

const { actions, reducer } = teamsSlice;

export const { updateScore, createTeam } = actions;
export default reducer;
