import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './redux/store'
import { Provider } from 'react-redux'
import { Auth0Provider } from "@auth0/auth0-react"
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs' 

dayjs.locale('ja')

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
      >
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DayjsUtils}>
            <App/>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
