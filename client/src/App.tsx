import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Month from './components/pages/month/Month'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Month}/>
      </Switch>
    </Router>
  )
}

export default App
