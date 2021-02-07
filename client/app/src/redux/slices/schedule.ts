import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Schedule }  from '../../types/schedule'
import dayjs from 'dayjs'

type CurrentSchedule = {
  item: Schedule
  isDialogOpen: boolean
}

const init: CurrentSchedule = {
  item: {
    id: "",
    userID: "",
    title: "",
    date: dayjs(),
    description: "",
    location: "",
  },
  isDialogOpen: false
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: init,
  reducers: {
    set: (state, { payload }: PayloadAction<Schedule>) => { state.item = payload },
    openDialog: (state, { payload }: PayloadAction<Schedule>) => {
      state.item = payload
      state.isDialogOpen = true 
    },
    closeDialog: state => { state.isDialogOpen = false },
  },
})
export default scheduleSlice