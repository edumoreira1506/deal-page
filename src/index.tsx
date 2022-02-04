import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import DealContainer, { DealContainerProps } from './containers/DealContainer/DealContainer'

const queryClient = new QueryClient()

type Callbacks = {
  onConfirmDeal?: DealContainerProps['onConfirmDeal'];
  onFinishDeal?: DealContainerProps['onFinishDeal'];
  onCancelDeal?: DealContainerProps['onCancelDeal'];
}

type Params = {
  breederId: string;
  dealId: string;
}

(window as any).renderPoultryPage = (
  containerId: string,
  { breederId, dealId }: Params,
  { onFinishDeal, onConfirmDeal, onCancelDeal }: Callbacks = {}
) => {
  const targetDocument = document.getElementById(containerId)

  if (targetDocument) {
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <DealContainer
          onConfirmDeal={onConfirmDeal}
          onFinishDeal={onFinishDeal}
          onCancelDeal={onCancelDeal}
          breederId={breederId}
          dealId={dealId}
        />
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
