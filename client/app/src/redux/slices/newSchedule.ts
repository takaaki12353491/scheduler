import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Schedule, ScheduleForm } from '../../types/schedule'
import dayjs from 'dayjs'
import { isSameDay } from '../../modules/calendar'

type NewSchedule = {
  type: 'create' | 'update'
  initValue: ScheduleForm
  form: ScheduleForm
  isDialogOpen: boolean
  isStartEdit: boolean
}

const init: NewSchedule = {
  type: 'create',
  initValue: {
    title: "",
    description: "",
    date: dayjs(),
    location: ""
  },
  form: {
    title: "",
    description: "",
    date: dayjs(),
    location: ""
  },
  isDialogOpen: false,
  isStartEdit: false,
}

const isEmpty = (v: ScheduleForm) => {
  return v.title === '' && v.location === '' && v.description === ''
}

const isEqualValue = (v1: ScheduleForm, v2: ScheduleForm) => {
  return v1.title === v2.title &&
    isSameDay(v1.date, v2.date) &&
    v1.location === v2.location &&
    v1.description === v2.description
}

export const newScheduleSlice = createSlice({
  name: 'newSchedule',
  initialState: init,
  reducers: {
    set: (state, { payload }: PayloadAction<ScheduleForm>) => { 
      state.form = payload
      state.isStartEdit = !isEqualValue(state.initValue, payload)
    },
    edit: (state, { payload }: PayloadAction<Schedule>) => {
      state.type = 'update'
      state.initValue = { ...payload }
      state.form = { ...payload }
      state.isDialogOpen = true
    },
    openDialog: (_, { payload }: PayloadAction<dayjs.Dayjs>) => ({
      ...init, form: { ...init.form, date: payload }, isDialogOpen: true
    }),
    closeDialog: state => { 
      state.isDialogOpen = false
    },

  },
})
export default newScheduleSlice