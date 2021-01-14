import dayjs from 'dayjs'
import { Date } from '../types'

export const createCalendar = (date: Date) => {
  const firstDay = getMonth(date)
  const firstDayIndex = firstDay.day()

  return Array(35).fill(0).map((_, i) => {
    const diffFromFirstDay = i - firstDayIndex
    const day = firstDay.add(diffFromFirstDay, 'day')
    return day
  })
}

export const isSameDay = (d1: dayjs.Dayjs, d2: dayjs.Dayjs) => {
  const format = 'YYYYMMDD'
  return d1.format(format) === d2.format(format)
}

export const isSameMonth = (m1: dayjs.Dayjs, m2: dayjs.Dayjs) => {
  const format = 'YYYYMM'
  return m1.format(format) === m2.format(format)
}

export const isFirstDay = (day: dayjs.Dayjs) => day.date() === 1

export const getMonth = ({ year, month }: Date) => {
  return dayjs(`${year}-${month}`)
}