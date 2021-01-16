import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { getPreviousMonth, getNextMonth } from '../../modules/calendar'

const today = dayjs()

const dateSlice = createSlice({
  name: 'date',
  initialState: today,
  reducers: {
    setMonth: (_, action: PayloadAction<dayjs.Dayjs>) => action.payload,
    previousMonth: state => getPreviousMonth(state),
    nextMonth: state => getNextMonth(state),
  }
})
export default dateSlice