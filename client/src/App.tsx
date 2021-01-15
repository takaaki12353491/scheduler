import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Month from './components/pages/month/Month'
import rootReducer from './redux/rootReducer'

const store = configureStore({reducer: rootReducer})

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route component={Month}/>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
