import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { scheduleSlice } from '../../../redux/slices'
import { GridList, Typography, makeStyles } from '@material-ui/core'
import Base from '../../templates/base/Base'
import Element from './Element'
import AddScheduleDialog from './AddScheduleDialog'
import { createCalendar } from '../../../modules/calendar'
import border from '../../../styles/border'
import { dateToTimestamp } from '../../../modules/calendar'

const days = ['日', '月', '火', '水', '木', '金', '土']

const Month = () => {
  const classes = useStyles()
  const [ isDialogOpen, setIsDialogOpen ] = React.useState(false)
  const date = useSelector(state => state.date)
  const schedule = useSelector(state => state.schedule)
  const dispatch = useDispatch()
  const { actions } = scheduleSlice
  const calendar = createCalendar(date)
  return (
    <Base>
      <AddScheduleDialog isOpen={isDialogOpen} close={() => setIsDialogOpen(false)}/>
      <div className={classes.container}>
        <GridList className={classes.grid} cols={7} spacing={0} cellHeight='auto'>
          {days.map(d => (
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
          {calendar.map(c => (
            <li 
              key={c.toISOString()} 
              onClick={() => {
                const timestamp = dateToTimestamp(c)
                dispatch(actions.set({ ...schedule, date: timestamp.toObject() }))
                setIsDialogOpen(true)
              }}
            >
              <Element day={c} date={date}/>
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