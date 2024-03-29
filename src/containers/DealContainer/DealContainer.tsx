import React, { VFC, useMemo, useEffect } from 'react'

import useData from '../../hooks/useData'
import Deal, { DealProps } from '../../views/Deal'

export type DealContainerProps = {
  breederId: string;
  dealId: string;
  onConfirmDeal?: DealProps['onConfirmDeal'];
  onFinishDeal?: DealProps['onFinishDeal'];
  onCancelDeal?: DealProps['onCancelDeal'];
  onReBuy?: DealProps['onReBuy'];
  refetch: boolean;
}

const DealContainer: VFC<DealContainerProps> = ({
  breederId,
  dealId,
  onCancelDeal,
  onConfirmDeal,
  onFinishDeal,
  onReBuy,
  refetch
}: DealContainerProps) => {
  const { data, isLoading, refetch: refetchData } = useData(breederId, dealId)

  const formattedEvents = useMemo(() => data?.events?.map(e => ({ ...e, createdAt: new Date(e.createdAt) })), [
    data?.events
  ])

  useEffect(() => {
    if (refetch && refetchData) {
      refetchData()
    }
  }, [refetch, refetchData])

  if (isLoading || !data?.advertising || !data?.breeder ||
    !data?.deal || !data?.poultry || !data?.events || !formattedEvents) {
    return null
  }

  return (
    <Deal
      advertising={data.advertising}
      poultry={data.poultry}
      events={formattedEvents}
      breeder={data.breeder}
      deal={data.deal}
      onCancelDeal={onCancelDeal}
      onConfirmDeal={onConfirmDeal}
      onFinishDeal={onFinishDeal}
      onReBuy={onReBuy}
      breederContacts={data.breederContacts}
    />
  )
}

export default DealContainer
