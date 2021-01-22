import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { scheduleSlice, createSchedule, newScheduleSlice } from '../../../redux/slices'
import { 
  Dialog, 
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  IconButton,
  makeStyles
} from '@material-ui/core'
import { 
  LocationOnOutlined, 
  NotesOutlined,
  AccessTime,
  Close,
} from '@material-ui/icons'
import { DatePicker } from '@material-ui/pickers'

type Props = {
  isOpen: boolean
  close: () => void
}

const AddDialog: React.FC<Props> = ({ isOpen, close }) => {
  const classes = useStyles()
  const { form, isStartEdit } = useSelector(state => state.newSchedule)
  const dispatch = useDispatch()
  const { actions } = newScheduleSlice
  const isTitleInvalid = isStartEdit && form.title === ''
  return (
    <Dialog open={isOpen} onClose={close} maxWidth='xs' fullWidth>
      <DialogContent>
        <DialogActions>
          <div className={classes.closeButton}>
            <IconButton 
              size='small'
              onClick={close} 
            >
              <Close />
            </IconButton>
          </div>
        </DialogActions>
        <TextField 
          autoFocus 
          fullWidth 
          placeholder='タイトルと日時を追加'
          value={form.title}
          onChange={e => dispatch(actions.set({...form, title: e.target.value}))}
          onBlur={e => dispatch(actions.startEdit())}
          error={isTitleInvalid}
          helperText={isTitleInvalid && 'タイトルは必須です。'}
          className={classes.title}
        />
        <Grid container spacing={1} alignItems='center' justify='space-between'>
          <Grid item>
            <AccessTime />
          </Grid>
          <Grid item xs={10}>
            <DatePicker
              value={form.date}
              onChange={date => date && dispatch(actions.set({...form, date: date}))}
              variant='inline'
              format='YYYY年M月D日'
              animateYearScrolling
              disableToolbar
              fullWidth
              className={classes.spacer}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems='center' justify='space-between'>
          <Grid item>
            <LocationOnOutlined />
          </Grid>
          <Grid item xs={10}>
            <TextField 
              className={classes.spacer} 
              fullWidth 
              placeholder='場所を追加'
              value={form.location}
              onChange={e => dispatch(actions.set({...form, location: e.target.value}))}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems='center' justify='space-between'>
          <Grid item>
            <NotesOutlined />
          </Grid>
          <Grid item xs={10}>
            <TextField 
              className={classes.spacer} 
              fullWidth 
              placeholder='説明を追加'
              value={form.description}
              onChange={e => dispatch(actions.set({...form, description: e.target.value}))}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          color='primary' 
          variant='outlined' 
          disabled={!isTitleInvalid}
          onClick={() => {
            dispatch(createSchedule(form))
            close()
          }}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default AddDialog

const useStyles = makeStyles(theme => ({
  closeButton: {
    textAlign: 'right',
  },
  title: {
    fontSize: 22,
    marginBottom: 20, 
  },
  spacer: {
    margin: '4px 0',
  }
}))