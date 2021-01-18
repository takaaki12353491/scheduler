import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { scheduleSlice } from '../../../redux/slices'
import { GridList, Typography, makeStyles } from '@material-ui/core'
import Base from '../../templates/base/Base'
import Element from './Element'
import AddScheduleDialog from './AddScheduleDialog'
import { getDays } from '../../../modules/calendar'
import { setSchedules } from '../../../modules/schedule'
import { dateToTimestamp } from '../../../modules/calendar'
import border from '../../../styles/border'

const Month: React.FC = () => {
  const classes = useStyles()
  const [ isDialogOpen, setIsDialogOpen ] = React.useState(false)
  const date = useSelector(state => state.date)
  const schedule = useSelector(state => state.schedule)
  const schedules = useSelector(state => state.schedules)
  const dispatch = useDispatch()
  const { actions } = scheduleSlice
  const days = setSchedules(getDays(date), schedules)
  return (
    <Base>
      <AddScheduleDialog isOpen={isDialogOpen} close={() => setIsDialogOpen(false)}/>
      <div className={classes.container}>
        <GridList className={classes.grid} cols={7} spacing={0} cellHeight='auto'>
          {['日', '月', '火', '水', '木', '金', '土'].map(d => (
            <li key={d}>
            <Typography
              className={classes.days}
              color="textSecondary"
              align="center"
              variant="caption"
              component="div"
            >
              {d}
            </Typography>
          </li>
          ))}
          {days.map(({ day, schedules }) => (
            <li 
              key={day.toISOString()} 
              onClick={() => {
                dispatch(actions.set({ ...schedule, date: dateToTimestamp(day) }))
                setIsDialogOpen(true)
              }}
            >
              <Element day={day} date={date} schedules={schedules}/>
            </li>
          ))}
        </GridList>
      </div>
    </Base>
  )
}
export default Month

const useStyles = makeStyles(theme => ({
  container: {
    height: '90vh',
  },
  grid: {
    borderLeft: border.default,
    borderTop: border.default,
  },
  days: {
    borderRight: border.default,
    paddingTop: '10px',
  },
}))