import 'react-redux'
import { combineReducers } from '@reduxjs/toolkit'
import dateSlice from './slices/date'

const rootReducer = combineReducers({ date: dateSlice.reducer })
 
type StoreState = ReturnType<typeof rootReducer>

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}
 
export default rootReducer