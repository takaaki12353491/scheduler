import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScheduleForm } from '../../types/schedule'
import dayjs from 'dayjs'

type NewSchedule = {
  form: ScheduleForm
  isDialogOpen: boolean
  isStartEdit: boolean
}

const init: NewSchedule = {
  form: {
    title: "",
    description: "",
    date: dayjs(),
    location: ""
  },
  isDialogOpen: false,
  isStartEdit: false,
}

export const newScheduleSlice = createSlice({
  name: 'newSchedule',
  initialState: init,
  reducers: {
    set: (state, { payload }: PayloadAction<ScheduleForm>) => { state.form = payload },
    openDialog: (_, { payload }: PayloadAction<dayjs.Dayjs>) => ({
      ...init, form: { ...init.form, date: payload }, isDialogOpen: true
    }),
    closeDialog: state => { state.isDialogOpen = false },
    startEdit: state => { state.isDialogOpen = false },
  },
})
export default newScheduleSlice