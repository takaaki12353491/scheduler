import { combineReducers } from '@reduxjs/toolkit'
import dateSlice from './date'

const rootReducer = combineReducers({ date: dateSlice.reducer })
 
export type RootState = ReturnType<typeof rootReducer>
 
export default rootReducer