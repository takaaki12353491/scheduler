import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Month from './components/pages/month/Month'

const App = () => {
  return (
    <Router>
      <Month/>
    </Router>
  )
}

export default App
