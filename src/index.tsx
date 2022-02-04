import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import DealContainer from './containers/DealContainer/DealContainer'

const queryClient = new QueryClient()

// eslint-disable-next-line @typescript-eslint/ban-types
type Callbacks = {}

type Params = {
  breederId: string;
  dealId: string;
}

(window as any).renderPoultryPage = (
  containerId: string,
  { breederId, dealId }: Params,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _callbacks: Callbacks = {}
) => {
  const targetDocument = document.getElementById(containerId)

  if (targetDocument) {
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <DealContainer breederId={breederId} dealId={dealId} />
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
