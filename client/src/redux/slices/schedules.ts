import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Schedule } from '../../types'
import { IndexRequest, CreateRequest }  from '../../pb/schedule_pb'
import { ScheduleServiceClient } from '../../pb/ScheduleServiceClientPb'
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb'
import { pbToSchedule } from '../../modules/schedule'
import { ScheduleForm } from '../../types'

const schedules: Schedule[] = []

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
      const response = await client.create(request, {})
      const schedule = response.getSchedule()
      return schedule && pbToSchedule(schedule)
    } catch(err) {
      console.log(err)
    }
  }
)

export const schedulesSlice = createSlice({
  name: 'schedules',
  initialState: schedules,
  reducers: {
    add: (state, action: PayloadAction<Schedule>) => {
      state.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createSchedule.fulfilled, (state, { payload }) => {
      payload && state.push(payload)
    })
  }
})
export default schedulesSlice