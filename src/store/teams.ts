import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import gamesAPI from '../api/games';
import { SocketMessage } from '../models/socket';
import { Team } from '../models/team';

// const getTeamById = createAsyncThunk(
//   'teams/getTeamByIdStatus',
//   async (teamId: string) => {
//     const response = await gamesAPI.getTeamById(teamId)
//     return response
//   }
// )

const teamsSlice = createSlice({
  name: 'teams',
  initialState: [] as Team[],
  reducers: {
    addTeam(state: Team[], action: PayloadAction<Team>) {
      state.push(action.payload);
    },
    updateScore() {},
    processGameResult(state: Team[], action: PayloadAction<SocketMessage>) {
      // dispatch addTeam if the team doesn't exist
      // dispatch updateScore if the team exists
      console.log('reducer received: ', action.payload);
    },
  },
});

const { actions, reducer } = teamsSlice;

export const { processGameResult, updateScore, addTeam } = actions;
export default reducer;
