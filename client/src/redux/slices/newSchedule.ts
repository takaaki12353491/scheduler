import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Schedule, ScheduleForm } from '../../types/schedule'
import dayjs from 'dayjs'

type NewSchedule = {
  type: 'create' | 'update'
  form: ScheduleForm
  isDialogOpen: boolean
  isStartEdit: boolean
}

const init: NewSchedule = {
  type: 'create',
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
    edit: (state, { payload }: PayloadAction<Schedule>) => {
      state.type = 'update'
      state.form = { ...payload }
      state.isDialogOpen = true
    },
    openDialog: (_, { payload }: PayloadAction<dayjs.Dayjs>) => ({
      ...init, form: { ...init.form, date: payload }, isDialogOpen: true
    }),
    closeDialog: state => { state.isDialogOpen = false },
    startEdit: state => { state.isStartEdit = true },
  },
})
export default newScheduleSlice