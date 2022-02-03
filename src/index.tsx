import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'

const queryClient = new QueryClient()

// eslint-disable-next-line @typescript-eslint/ban-types
type Callbacks = {}

// eslint-disable-next-line @typescript-eslint/ban-types
type Params = {}

(window as any).renderPoultryPage = (
  containerId: string,
  _params: Params,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _callbacks: Callbacks = {}
) => {
  const targetDocument = document.getElementById(containerId)

  if (targetDocument) {
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
      targetDocument,
    )
  }
};

(window as any).unmountPoultryPage = (containerId: string) => {
  const targetDocument = document.getElementById(containerId)

  if (targetDocument) {
    ReactDOM.unmountComponentAtNode(targetDocument)
  }
}
