import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { scheduleSlice } from '../../../redux/slices'
import { Schedule } from '../../../pb/schedule_pb'
import { GridList, Typography, makeStyles } from '@material-ui/core'
import Base from '../../templates/base/Base'
import AddDialog from './AddDialog'
import DetailDialog from './DetailDialog'
import Element from './Element'
import { getDays, dateToTimestamp } from '../../../modules/calendar'
import { setSchedules } from '../../../modules/schedule'
import border from '../../../styles/border'

const Month: React.FC = () => {
  const classes = useStyles()
  const [ isAddDialogOpen, setIsAddDialogOpen ] = React.useState(false)
  const [ isDetailDialogOpen, setIsDetailDialogOpen ] = React.useState(false)
  const date = useSelector(state => state.date)
  const schedules = useSelector(state => state.schedules)
  const dispatch = useDispatch()
  const { actions } = scheduleSlice
  const days = setSchedules(getDays(date), schedules)
  return (
    <Base>
      <AddDialog isOpen={isAddDialogOpen} close={() => setIsAddDialogOpen(false)}/>
      <DetailDialog isOpen={isDetailDialogOpen} close={() => setIsDetailDialogOpen(false)}/>
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
                const schedule = new Schedule().toObject()
                schedule.date = dateToTimestamp(day)
                dispatch(actions.set(schedule))
                setIsAddDialogOpen(true)
              }}
            >
              <Element 
                day={day} 
                schedules={schedules}
                openDialog={() => setIsDetailDialogOpen(true)}
              />
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