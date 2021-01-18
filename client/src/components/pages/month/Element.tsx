import React from 'react'
import dayjs from 'dayjs'
import { Schedule } from '../../../pb/schedule_pb'
import { useSelector } from 'react-redux'
import { Typography, makeStyles } from '@material-ui/core'
import { isSameMonth, isFirstDay, isSameDay } from '../../../modules/calendar'
import border from '../../../styles/border'

type Props = {
  day: dayjs.Dayjs
  schedules: Schedule.AsObject[]
  openDialog: () => void
}

const Element: React.FC<Props> = ({ day, schedules, openDialog }) => {
  const classes = useStyles()
  const date = useSelector(state => state.date)
  const today = dayjs()
  const format = isFirstDay(day) ? 'M月D日' : 'D'
  const isToday = isSameDay(day, today)
  const isCurrentMonth = isSameMonth(day, date)
  return (
    <div className={classes.element}>
      <Typography
        className={classes.date}
        color={isCurrentMonth ? 'textPrimary' : 'textSecondary'}
        align='center'
        variant='caption'
        component='div'
      >
        <span className={isToday ? classes.today : ''}>
          {day.format(format)}
        </span>
        <div className={classes.schedules}>
          {schedules.map(schedule => (
            <div 
              key={schedule.id}
              className={classes.schedule}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                openDialog()
              }}
            >
              {schedule.title}
            </div>
          ))}
        </div>
      </Typography>
    </div>
  )
}
export default Element

const useStyles = makeStyles(theme => ({
  element: {
    borderRight: border.default,
    borderBottom: border.default,
    height: '18vh',
  },
  date: {
    padding: '5px 0',
    height: '24px',
  },
  today: {
    display: 'inline-block',
    lineHeight: '24px',
    width: '24px',
    backgroundColor: '#1a73e8',
    color: '#fff',
    borderRadius: '50%',
  },
  schedules: {
    overflow: 'scroll',
    height: 'calc(18vh - 40px)',
  },
  schedule: {
    width: '90%',
    backgroundColor: 'rgb(121, 134, 203)',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '14px',
    padding: '1px 4px',
    margin: '1px auto',
    cursor: 'pointer',
  },
}))