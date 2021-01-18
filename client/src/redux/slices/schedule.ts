import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Schedule }  from '../../pb/schedule_pb'

const schedule: Schedule.AsObject = {
  id: "",
  title: "",
  description: "",
  date: undefined,
  location: "",
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: schedule,
  reducers: {
    set: (_, action: PayloadAction<Schedule.AsObject>) => action.payload,
  },
})
export default scheduleSlice