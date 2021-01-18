import dayjs from 'dayjs'
import { Schedule } from '../pb/schedule_pb'
import { isSameDay, timestampToDate } from "./calendar"

export const setSchedules = (days: dayjs.Dayjs[], schedules: Schedule.AsObject[]) =>
  days.map(day => ({
    day: day,
    schedules: schedules.filter(schedule => schedule.date && isSameDay(timestampToDate(schedule.date), day))
  }))