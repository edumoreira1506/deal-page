import { IAdvertising, IBreeder, IDeal, IDealEvent, IPoultry } from '@cig-platform/types'
import React, { VFC, useMemo } from 'react'
import { History, DealInfo } from '@cig-platform/ui'

import { StyledContainer, StyledHistoryContainer } from './Deal.styles'
import dealInfoFormatter from '../formatters/dealInfoFormatter'

type DealProps = {
  events?: IDealEvent[];
  poultry: IPoultry;
  advertising: IAdvertising;
  breeder: IBreeder;
  deal: IDeal;
}

const Deal: VFC<DealProps> = ({
  events = [],
  poultry,
  advertising,
  breeder,
  deal
}: DealProps) => {
  const dealInfoProps = useMemo(() => dealInfoFormatter({ deal, poultry, advertising, breeder }), [
    deal,
    poultry,
    advertising,
    breeder
  ])

  return (
    <StyledContainer>
      <DealInfo {...dealInfoProps} />
      <StyledHistoryContainer>
        <History events={events} />
      </StyledHistoryContainer>
    </StyledContainer>
  )
}

export default Deal
