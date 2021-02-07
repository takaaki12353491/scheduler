import dayjs from 'dayjs'
import { Schedule } from '../types'
import { isSameDay } from "./calendar"
import { Schedule as ShcedulePB }  from '../pb/schedule_pb'
import { timestampToDate } from './calendar'

export const setSchedules = (days: dayjs.Dayjs[], schedules: Schedule[]) =>
  days.map(day => ({
    day: day,
    schedules: schedules.filter(schedule => isSameDay(schedule.date, day))
  }))

export const pbToSchedule = (pb: ShcedulePB) => {
  const timestamp = pb.getDate()
  const schedule: Schedule = {
    id: pb.getId(),
    userID: pb.getUserId(),
    title: pb.getTitle(),
    date: timestamp ? timestampToDate(timestamp) : dayjs(),
    location: pb.getLocation(),
    description: pb.getDescription(),
  }
  return schedule
}