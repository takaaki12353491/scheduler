import 'react-redux'
import { combineReducers } from '@reduxjs/toolkit'
import { dateSlice, scheduleSlice, schedulesSlice } from './slices'

const rootReducer = combineReducers({ 
  date: dateSlice.reducer,
  schedule: scheduleSlice.reducer,
  schedules: schedulesSlice.reducer,
})

export default rootReducer
 
type StoreState = ReturnType<typeof rootReducer>

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}