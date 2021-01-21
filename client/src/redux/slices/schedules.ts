import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Schedule, CreateRequest }  from '../../pb/schedule_pb'
import { ScheduleServiceClient } from '../../pb/ScheduleServiceClientPb'
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'
import { useAuth0 } from '@auth0/auth0-react'

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
    const date = new google_protobuf_timestamp_pb.Timestamp()
    obj.date && date.setSeconds(obj.date.seconds)
    request
      .setTitle(obj.title)
      .setDate(date)
      .setLocation(obj.location)
      .setDescription(obj.description)
    const { getIdTokenClaims } = useAuth0()
    const client = new ScheduleServiceClient(process.env.REACT_APP_API_URL, {
      Authentication: (await getIdTokenClaims()).__raw
    })
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