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
    set: (state, { payload }: PayloadAction<ScheduleForm>) => { 
      state.form = payload
      state.isStartEdit = true
    },
    edit: (state, { payload }: PayloadAction<Schedule>) => {
      state.type = 'update'
      state.form = { ...payload }
      state.isDialogOpen = true
    },
    openDialog: (_, { payload }: PayloadAction<dayjs.Dayjs>) => ({
      ...init, form: { ...init.form, date: payload }, isDialogOpen: true
    }),
    closeDialog: state => { 
      if (state.isStartEdit && !window.confirm('保存されてない変更を破棄しますか？')) return
      state.isDialogOpen = false
    },
  },
})
export default newScheduleSlice