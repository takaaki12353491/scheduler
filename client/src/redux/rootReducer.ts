import { combineReducers } from 'redux'
import dateReducer from './calendar/reducer'

const rootReducer = combineReducers({ date: dateReducer })

export default rootReducer