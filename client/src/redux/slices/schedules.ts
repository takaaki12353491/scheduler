import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Schedule }  from '../../pb/schedule_pb'

const schedules: Schedule.AsObject[] = []

export const schedulesSlice = createSlice({
  name: 'schedules',
  initialState: schedules,
  reducers: {
    add: (state, action: PayloadAction<Schedule.AsObject>) => {
      state.push(action.payload)
    },
  },
})
export default schedulesSlice