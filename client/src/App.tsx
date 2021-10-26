import './App.css'
import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import {colors} from './components/Theme/ColorPalette';
import {Box} from '@material-ui/core'
import MyRepos from './pages/MyRepos'
import Header from './components/Header/Header'
import 'react-toastify/dist/ReactToastify.css'
import PublicRoute from './Routes/PublicRoute'
import {createTheme, ThemeProvider} from '@material-ui/core/styles'

const theme = createTheme()
function App() {
  return (
    <ThemeProvider theme={theme}>
        <Box className="App">
          <Box
            style={{
              backgroundColor: colors.lightWhite,
              minHeight: '100vh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
              <Router>
                <Header />
                <Switch>
                  <PublicRoute exact path="/" component={MyRepos} />
                </Switch>
              </Router>
          </Box>
          <ToastContainer position="bottom-right" />
        </Box>
    </ThemeProvider>
  )
}

export default App
