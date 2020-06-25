import { createSlice } from '@reduxjs/toolkit';

export interface socketState {
	host: string;
}

const socketSlice = createSlice({
	name: 'socket',
	initialState: {
		host: ''
	},
	reducers: {
		wConnect(state, action) {
			state.host = action.payload;
		},
		wDisconnect(state) {
			state.host = ''
		}
	}
});

const { actions, reducer } = socketSlice;

export const { wConnect, wDisconnect } = actions;
export default reducer;
