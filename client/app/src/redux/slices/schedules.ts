import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Schedule } from '../../types'
import { IndexRequest, CreateRequest, UpdateRequest, DeleteRequest }  from '../../pb/schedule_pb'
import { ScheduleServiceClient } from '../../pb/ScheduleServiceClientPb'
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb'
import { pbToSchedule } from '../../modules/schedule'
import { ScheduleForm } from '../../types'
import dayjs from 'dayjs'

type Schedules = {
  items: Schedule[]
  isLoading: boolean
  err?: string
}

const init: Schedules = {
  items: [{id: 'test', userID: 'test', title: 'test', date: dayjs(), location: 'test', description: 'test'}],
  isLoading: false,
}

export const fetchSchedules = createAsyncThunk<
  Schedule[],
  string,
  {}
>('schedules/fetch', async (id, thunkApi) => {
    const request = new IndexRequest()
    const client = new ScheduleServiceClient(process.env.REACT_APP_API_URL)
    const response = await client.index(request, {})
    return response.getSchedulesList().map(schedule => pbToSchedule(schedule))
  }
)

export const createSchedule = createAsyncThunk<
  Schedule | undefined,
  ScheduleForm,
  {}
>('schedule/create', async (form, thunkApi) => {
    const request = new CreateRequest()
    const date = new Timestamp()
    date.fromDate(form.date.toDate())
    request
      .setTitle(form.title)
      .setDate(date)
      .setLocation(form.location)
      .setDescription(form.description)
    const client = new ScheduleServiceClient(process.env.REACT_APP_API_URL, {
      Authentication: ''
    })
    try {
      const response = await client.create(request, {
        Authorization: ''
      })
      const schedule = response.getSchedule()
      return schedule && pbToSchedule(schedule)
    } catch(err) {
      console.log(err)
    }
  }
)

export const updateSchedule = createAsyncThunk<
  Schedule | undefined,
  { id: string, form: ScheduleForm},
  {}
>('schedule/update', async ({ id,form }, thunkApi) => {
    const request = new UpdateRequest()
    const date = new Timestamp()
    date.fromDate(form.date.toDate())
    request
      .setTitle(form.title)
      .setDate(date)
      .setLocation(form.location)
      .setDescription(form.description)
    const client = new ScheduleServiceClient(process.env.REACT_APP_API_URL)
    try {
      const response = await client.create(request, {
        Authorization: ''
      })
      const schedule = response.getSchedule()
      return schedule && pbToSchedule(schedule)
    } catch(err) {
      console.log(err)
    }
  }
)

export const deleteSchedule = createAsyncThunk<
  string | undefined,
  string,
  {}
>('schedule/delete', async (id, thunkApi) => {
    const request = new DeleteRequest()
    request.setId(id)
    const client = new ScheduleServiceClient(process.env.REACT_APP_API_URL)
    try {
      const response = await client.delete(request, {
        Authorization: ''
      })
      return id
    } catch(err) {
      console.log(err)
    }
  }
)

export const schedulesSlice = createSlice({
  name: 'schedules',
  initialState: init,
  reducers: {
    add: (state, { payload }: PayloadAction<Schedule>) => {
      state.items.push(payload)
    },
    clearError: (state) => {
      state.err = undefined
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createSchedule.fulfilled, (state, { payload }) => {
      payload && state.items.push(payload)
    })
    builder.addCase(createSchedule.rejected, state => {
      state.err = 'エラーが発生しました。時間をおいて再度お試しください。'
    })
  }
})
export default schedulesSlice