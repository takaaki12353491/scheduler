import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { scheduleSlice } from '../../../redux/slices'
import { 
  Dialog, 
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Input,
  Grid,
  IconButton,
  makeStyles
} from '@material-ui/core'
import { 
  LocationOnOutlined, 
  NotesOutlined,
  AccessTime,
  Close,
} from "@material-ui/icons"
import { DatePicker } from "@material-ui/pickers"
import dayjs from 'dayjs'
import { dateToTimestamp, timestampToDate } from '../../../modules/calendar'

type Props = {
  isOpen: boolean
  close: () => void
}

const AddScheduleDialog = ({ isOpen, close }: Props) => {
  const classes = useStyles()
  const schedule = useSelector(state => state.schedule)
  const dispatch = useDispatch()
  const { actions } = scheduleSlice
  return (
    <Dialog open={isOpen} onClose={close} maxWidth='xs' fullWidth>
      <DialogContent>
        <DialogActions>
          <div className={classes.closeButton}>
            <IconButton onClick={close} size="small">
              <Close />
            </IconButton>
          </div>
        </DialogActions>
        <Input 
          className={classes.title} 
          autoFocus 
          fullWidth 
          placeholder="タイトルと日時を追加"
          value={schedule.title}
          onChange={e => dispatch(actions.set({...schedule, title: e.target.value}))}
        />
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>
            <AccessTime />
          </Grid>
          <Grid item xs={10}>
            <DatePicker
              value={schedule.date ? timestampToDate(schedule.date) : dayjs()}
              onChange={date => {              
                date && dispatch(actions.set({ 
                  ...schedule, date: dateToTimestamp(date)
                }))
              }}
              variant="inline"
              format="YYYY年M月D日"
              animateYearScrolling
              disableToolbar
              fullWidth
              className={classes.spacer}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>
            <LocationOnOutlined />
          </Grid>
          <Grid item xs={10}>
            <TextField 
              className={classes.spacer} 
              fullWidth 
              placeholder="場所を追加"
              value={schedule.location}
              onChange={e => dispatch(actions.set({...schedule, location: e.target.value}))}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>
            <NotesOutlined />
          </Grid>
          <Grid item xs={10}>
            <TextField 
              className={classes.spacer} 
              fullWidth 
              placeholder="説明を追加"
              value={schedule.description}
              onChange={e => dispatch(actions.set({...schedule, description: e.target.value}))}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="outlined">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default AddScheduleDialog

const useStyles = makeStyles(theme => ({
  closeButton: {
    textAlign: "right",
  },
  title: {
    marginBottom: 32, 
    fontSize: 22,
  },
  spacer: {
    margin: "4px 0",
  }
}))