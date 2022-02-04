import React, { VFC, useMemo } from 'react'

import useData from '../../hooks/useData'
import Deal from '../../views/Deal'

type DealContainerProps = {
  breederId: string;
  dealId: string;
}

const DealContainer: VFC<DealContainerProps> = ({
  breederId,
  dealId
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
    />
  )
}

export default DealContainer
