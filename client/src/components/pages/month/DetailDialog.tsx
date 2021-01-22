import React from 'react'
import { useSelector } from 'react-redux'
import {
  Dialog,
  DialogContent,
  IconButton,
  DialogActions,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core'
import { Close, LocationOnOutlined, NotesOutlined } from '@material-ui/icons'

type Props = {
  isOpen: boolean
  close: () => void
}

const DetailDialog: React.FC<Props> = ({ isOpen, close }) => {
  const classes = useStyles()
  const schedule = useSelector(state => state.schedule)
  return (
    <Dialog open={isOpen} onClose={close} maxWidth='xs' fullWidth>
      <DialogActions>
        <div className={classes.closeButton}>
          <IconButton onClick={close} size='small'>
            <Close />
          </IconButton>
        </div>
      </DialogActions>
      <DialogContent>
        {schedule && (
          <>
            <div>
              <Grid
                container
                spacing={1}
                alignItems='center'
                justify='space-between'
                className={classes.title}
              >
                <Grid item>
                  <span className={classes.box}></span>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant='h5' component='h2'>
                    {schedule.title}
                  </Typography>
                  <Typography color='textSecondary'>
                    {schedule.date.format('M月 D日')}
                  </Typography>
                </Grid>
              </Grid>
            </div>

            {schedule.location && (
              <Grid
                container
                spacing={1}
                alignItems='center'
                justify='space-between'
                className={classes.spacer}
              >
                <Grid item>
                  <LocationOnOutlined />
                </Grid>
                <Grid item xs={10}>
                  <Typography>{schedule.location}</Typography>
                </Grid>
              </Grid>
            )}
            {schedule.description && (
              <Grid
                container
                spacing={1}
                alignItems='center'
                justify='space-between'
                className={classes.spacer}
              >
                <Grid item>
                  <NotesOutlined />
                </Grid>
                <Grid item xs={10}>
                  <Typography>{schedule.description}</Typography>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
export default DetailDialog

const useStyles = makeStyles(theme => ({
  closeButton: {
    textAlign: 'right',
  },
  box: {
    backgroundColor: 'rgb(121, 134, 203)',
    width: '16px',
    height: '16px',
    display: 'block',
    marginLeft: '6px',
    borderRadius: '4px',
  },
  title: {
    marginBottom: 32, 
    fontSize: 22,
  },
  spacer: {
    margin: '4px 0',
  }
}))