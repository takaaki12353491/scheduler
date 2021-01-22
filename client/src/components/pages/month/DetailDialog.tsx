import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { scheduleSlice } from '../../../redux/slices'
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

const DetailDialog: React.FC = () => {
  const classes = useStyles()
  const { item, isDialogOpen } = useSelector(state => state.schedule)
  const dispatch = useDispatch()
  const { actions } = scheduleSlice
  return (
    <Dialog 
      maxWidth='xs' 
      fullWidth 
      open={isDialogOpen} 
      onClose={() => dispatch(actions.openDialog())}
    >
      <DialogActions>
        <div className={classes.closeButton}>
          <IconButton size='small' onClick={() => dispatch(actions.closeDialog())}>
            <Close />
          </IconButton>
        </div>
      </DialogActions>
      <DialogContent>
        {item && (
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
                    {item.title}
                  </Typography>
                  <Typography color='textSecondary'>
                    {item.date.format('M月 D日')}
                  </Typography>
                </Grid>
              </Grid>
            </div>

            {item.location && (
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
                  <Typography>{item.location}</Typography>
                </Grid>
              </Grid>
            )}
            {item.description && (
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
                  <Typography>{item.description}</Typography>
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