import dayjs from 'dayjs'
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'

export const getDays = (date: dayjs.Dayjs) => {
  const month = date.date(1)
  const firstDayIndex = month.day()

  return Array(35).fill(0).map((_, i) => {
    const diffFromFirstDay = i - firstDayIndex
    const day = month.add(diffFromFirstDay, 'day')
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

const getMonthStateCreator = (diff: number) => (date: dayjs.Dayjs) => date.add(diff, 'month')

export const getNextMonth = getMonthStateCreator(1)
export const getPreviousMonth = getMonthStateCreator(-1)

export const dateToTimestamp = (date: dayjs.Dayjs): google_protobuf_timestamp_pb.Timestamp.AsObject => ({
  seconds: date.unix(),
  nanos: 0,
})

export const timestampToDate = (timestamp: google_protobuf_timestamp_pb.Timestamp.AsObject) => {
  return dayjs(timestamp.seconds * 1000)
}