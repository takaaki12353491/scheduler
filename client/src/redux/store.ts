import 'react-redux'
import { Date } from '../types'

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}

export type StoreState = {
  date: Date
}