import { Date } from '../../types'

export const DATE_SET_MONTH = 'DATE_SET_MONTH'

export const dateSetMonth = (payload: Date) => ({
  type: DATE_SET_MONTH,
  payload
})