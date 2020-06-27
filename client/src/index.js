import React from 'react'
import { render } from 'react-dom'
import App from 'src/app'
import { AppContainer } from 'react-hot-loader'

const renderApp = (NextApp) => {
  render(
    <AppContainer>
      <NextApp />
    </AppContainer>,
    document.querySelector('[data-js="app"]')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('src/app', () => {
    const NextApp = require('src/app').default
    renderApp(NextApp)
  })
}
