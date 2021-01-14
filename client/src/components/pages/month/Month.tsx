import React from 'react'
import { GridList, Typography, makeStyles } from '@material-ui/core'
import Element from './Element'
import { createCalendar } from '../../../modules/calendar'
import border from '../../../styles/border'

const days = ['日', '月', '火', '水', '木', '金', '土'];

const calendar = createCalendar()

const Month = () => {
  const classes = useStyles() 
  return (
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
          <li key={c.toISOString()}>
            <Element day={c}/>
          </li>
        ))}
      </GridList>
    </div>
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