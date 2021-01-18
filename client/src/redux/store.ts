import 'react-redux'
import { combineReducers } from '@reduxjs/toolkit'
import { dateSlice, scheduleSlice } from './slices'

const rootReducer = combineReducers({ 
  date: dateSlice.reducer,
  schedule: scheduleSlice.reducer,
})

export default rootReducer
 
type StoreState = ReturnType<typeof rootReducer>

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}