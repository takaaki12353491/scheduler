import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, makeStyles } from '@material-ui/core'

const Auth: React.FC = () => {
  const classes = useStyles()
  const { user, isAuthenticated, isLoading,loginWithRedirect, logout } = useAuth0()
  return (
    <div className={classes.auth}>
      {!isLoading && isAuthenticated ?
        <Button onClick={() => logout()}>
          Log Out
        </Button>
        :
        <Button onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      }
    </div>
  )
}
export default Auth

const useStyles = makeStyles(theme => ({
  auth: {
    position: 'absolute',
    right: '30px',
  },
}))