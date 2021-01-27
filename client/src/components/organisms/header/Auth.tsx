import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Avatar, Menu, MenuItem, makeStyles } from '@material-ui/core'

const Auth: React.FC = () => {
  const classes = useStyles()
  const { user, isAuthenticated, isLoading,loginWithRedirect, logout } = useAuth0()
  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null)
  const RenderMenu = () => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      keepMounted
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem onClick={() => logout()}>Log out</MenuItem>
    </Menu>
  )
  return (
    <div className={classes.auth}>
      {isLoading ?
      <div>Loading ...</div>
      :
      isAuthenticated ?
        <Avatar src={user.picture} onClick={e => setAnchorEl(e.currentTarget)} className={classes.avator}>
          {user.name}
        </Avatar>
        :
        <Button onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      }
      <RenderMenu/>
    </div>
  )
}
export default Auth

const useStyles = makeStyles(theme => ({
  auth: {
    position: 'absolute',
    right: '30px',
  },
  avator: {
    cursor: 'pointer',
  }
}))