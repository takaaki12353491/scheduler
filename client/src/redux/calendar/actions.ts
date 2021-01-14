import { Date } from '../../types'

export const CALENDAR_SET_MONTH = 'CALENDAR_SET_MONTH'

export const calendarSetMonth = (payload: Date) => ({
  type: CALENDAR_SET_MONTH,
  payload
})