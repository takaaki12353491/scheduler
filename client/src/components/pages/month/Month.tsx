import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newScheduleSlice, scheduleSlice, schedulesSlice } from '../../../redux/slices'
import { GridList, Typography, makeStyles } from '@material-ui/core'
import Base from '../../templates/base/Base'
import NewDialog from './NewDialog'
import DetailDialog from './DetailDialog'
import Element from './Element'
import { getDays } from '../../../modules/calendar'
import { setSchedules } from '../../../modules/schedule'
import border from '../../../styles/border'
import ErrorSnackbar from '../../molecules/snackbar/ErrorSnackbar'

const Month: React.FC = () => {
  const classes = useStyles()
  const date = useSelector(state => state.date)
  const schedules = useSelector(state => state.schedules)
  const dispatch = useDispatch()
  const { actions } = newScheduleSlice
  const days = setSchedules(getDays(date), schedules.items)
  return (
    <Base>
      <NewDialog />
      <DetailDialog />
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
              onClick={() => dispatch(actions.openDialog(day))}
            >
              <Element day={day} schedules={schedules} />
            </li>
          ))}
        </GridList>
        <ErrorSnackbar 
          error={schedules.err}
          handleClose={() => dispatch(schedulesSlice.actions.clearError())}
        />
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