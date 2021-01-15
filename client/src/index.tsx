import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'
import rootReducer from './redux/rootReducer'
import DayjsUtils from '@date-io/dayjs'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

const store = configureStore({reducer: rootReducer})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <App/>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
