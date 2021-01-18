import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import DehazeIcon from '@material-ui/icons/Dehaze'
import dateSlice from '../../../redux/slices/date'

const Header: React.FC = () => {
  const classes = useStyles()
  const date = useSelector(state => state.date)
  const dispatch = useDispatch()
  const { actions } = dateSlice
  return (
    <Toolbar className={classes.container}>
      <IconButton>
        <DehazeIcon />
      </IconButton>
      <img src='/images/calendar_icon.png' alt='' width='40' height='40' />
      <Typography className={classes.title} color='textSecondary' variant='h5' component='h1'>
        カレンダー
      </Typography>
      <IconButton size='small' onClick={() => dispatch(actions.previousMonth())}>
        <ArrowBackIos />
      </IconButton>
      <IconButton size='small' onClick={() => dispatch(actions.nextMonth())}>
        <ArrowForwardIos />
      </IconButton>
      <Typography className={classes.month}>
        {date.format('YYYY年 M月')}
      </Typography>
    </Toolbar>
  )
}

export default Header

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0',
  },
  title: {
    margin: '0 30px 0 10px',
  },
  month: {
    marginLeft: 30,
  }
}))