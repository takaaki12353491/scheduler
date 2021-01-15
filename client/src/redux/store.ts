import 'react-redux'
import dayjs from 'dayjs'

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}

export type StoreState = {
  date: dayjs.Dayjs
}