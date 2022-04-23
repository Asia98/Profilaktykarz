import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {ColorModeScript, ChakraProvider, ThemeConfig, extendTheme} from '@chakra-ui/react'

import '@/i18n'
import Router from '@/router'
import {store} from '@/store'

import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/700.css'

const config: ThemeConfig = {
  initialColorMode: 'light',
}

const theme = extendTheme({
  config,
  fonts: {
    body: 'Open Sans',
    heading: 'Open Sans',
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <Router />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
