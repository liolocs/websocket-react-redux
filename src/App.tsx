import React from 'react'
import Sheet from './components/atoms/Sheet'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
	return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Sheet color='secondary' bg='bg.main' alignItems='center' justifyContent='center'>
          My first project
        </Sheet>
      </ThemeProvider>
    </Provider>
	)
}

export default App
