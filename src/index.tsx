import { queryClient } from '@cig-platform/data-helper'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'

import DealContainer, { DealContainerProps } from './containers/DealContainer/DealContainer'

type Callbacks = {
  onConfirmDeal?: DealContainerProps['onConfirmDeal'];
  onFinishDeal?: DealContainerProps['onFinishDeal'];
  onCancelDeal?: DealContainerProps['onCancelDeal'];
  onReBuy?: DealContainerProps['onReBuy'];
}

type Params = {
  breederId: string;
  dealId: string;
  refetch?: boolean;
}

(window as any).renderDealPage = (
  containerId: string,
  { breederId, dealId, refetch = false }: Params,
  { onFinishDeal, onConfirmDeal, onCancelDeal, onReBuy }: Callbacks = {}
) => {
  const targetDocument = document.getElementById(containerId)

  if (targetDocument) {
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <DealContainer
          onConfirmDeal={onConfirmDeal}
          onFinishDeal={onFinishDeal}
          onCancelDeal={onCancelDeal}
          onReBuy={onReBuy}
          breederId={breederId}
          dealId={dealId}
          refetch={refetch}
        />
      </QueryClientProvider>,
      targetDocument,
    )
  }
};

(window as any).unmountDealPage = (containerId: string) => {
  const targetDocument = document.getElementById(containerId)

  if (targetDocument) {
    ReactDOM.unmountComponentAtNode(targetDocument)
  }
}
