import React, { VFC, useMemo } from 'react'

import useData from '../../hooks/useData'
import Deal, { DealProps } from '../../views/Deal'

export type DealContainerProps = {
  breederId: string;
  dealId: string;
  onConfirmDeal?: DealProps['onConfirmDeal'];
  onFinishDeal?: DealProps['onFinishDeal'];
  onCancelDeal?: DealProps['onCancelDeal'];
}

const DealContainer: VFC<DealContainerProps> = ({
  breederId,
  dealId,
  onCancelDeal,
  onConfirmDeal,
  onFinishDeal
}: DealContainerProps) => {
  const { data, isLoading } = useData(breederId, dealId)

  const formattedEvents = useMemo(() => data?.events?.map(e => ({ ...e, createdAt: new Date(e.createdAt) })), [
    data?.events
  ])

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
      breederContacts={data.breederContacts}
    />
  )
}

export default DealContainer
