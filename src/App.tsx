import React from 'react'
import Main from './components/pages/Main'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
	return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Main></Main>
      </ThemeProvider>
    </Provider>
	)
}

export default App
