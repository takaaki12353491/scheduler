import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Schedule, CreateRequest }  from '../../pb/schedule_pb'
import { ScheduleServiceClient } from '../../pb/ScheduleServiceClientPb'
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import { URL } from '../../consts'

const schedules: Schedule.AsObject[] = []

export const createSchedule = createAsyncThunk<
  Schedule.AsObject | undefined,
  Schedule.AsObject,
  {
    extra: {
    }
  }
>('schedule/create', async (obj, thunkApi) => {
    const request = new CreateRequest()
    const schedule = new Schedule()
    const date = new google_protobuf_timestamp_pb.Timestamp()
    obj.date && date.setSeconds(obj.date.seconds)
    schedule
      .setId(obj.id)
      .setTitle(obj.id)
      .setDescription(obj.id)
      .setDate(date)
      .setLocation(obj.location)
    const client = new ScheduleServiceClient(URL ? URL : '')
    const response = await client.create(request, {})
    return response.getSchedule()?.toObject()
  }
)

export const schedulesSlice = createSlice({
  name: 'schedules',
  initialState: schedules,
  reducers: {
    add: (state, action: PayloadAction<Schedule.AsObject>) => {
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