import { combineReducers } from 'redux'
import dateReducer from './date/reducer'

const rootReducer = combineReducers({ date: dateReducer })

export default rootReducer