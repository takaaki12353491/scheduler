import React from 'react'
import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Month from './components/pages/month/Month'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route component={Month}/>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
