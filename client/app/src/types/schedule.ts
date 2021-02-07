import dayjs from 'dayjs'

export type Schedule = {
  id: string
  userID: string
  title: string
  date: dayjs.Dayjs
  location: string
  description: string
}

export type ScheduleForm = {
  title: string
  date: dayjs.Dayjs
  location: string
  description: string 
}