import React, { VFC } from 'react'

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

  if (isLoading || !data?.advertising || !data?.breeder || !data?.deal || !data?.breeder || !data?.poultry) return null

  return (
    <Deal />
  )
}

export default DealContainer
