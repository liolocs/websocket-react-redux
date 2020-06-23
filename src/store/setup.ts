import { createSlice } from '@reduxjs/toolkit';

const setupSlice = createSlice({
	name: 'setup',
	initialState: {
		test: true
	},
	reducers: {
		toggleTest(state, action) {
			state.test = !state.test;
		}
	}
});

const { actions, reducer } = setupSlice;

export const { toggleTest } = actions;
export default reducer;
