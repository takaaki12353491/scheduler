import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Schedule }  from '../../types/schedule'
import dayjs from 'dayjs'

const init: Schedule = {
  id: "",
  userID: "",
  title: "",
  date: dayjs(),
  description: "",
  location: "",
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: init,
  reducers: {
    set: (_, { payload }: PayloadAction<Schedule>) => payload,
  },
})
export default scheduleSlice