import dayjs from 'dayjs'
import { Date } from '../../types'
import { CALENDAR_SET_MONTH } from './actions'

const day = dayjs()

const init: Date = {
  year: day.year(),
  month: day.month() + 1
}

const dateReducer = (state = init, action: { type: string, payload: Date }) => {
  const { type, payload } = action
  switch (type) {
    case CALENDAR_SET_MONTH:
      return payload
    default:
      return state
  }
}

export default dateReducer