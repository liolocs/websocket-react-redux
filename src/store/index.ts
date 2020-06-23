import { configureStore } from '@reduxjs/toolkit'
import setupReducer from './setup'

const store = configureStore({
	reducer: {
		setup: setupReducer
	}
})

export default store
