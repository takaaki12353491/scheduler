import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { formatMonth, getPreviousMonth, getNextMonth } from '../modules/calendar'

const day = dayjs()

const init = formatMonth(day)

const dateSlice = createSlice({
  name: 'date',
  initialState: init,
  reducers: {
    previousMonth: state => getPreviousMonth(state),
    nextMonth: state => getNextMonth(state),
  }
})
export default dateSlice