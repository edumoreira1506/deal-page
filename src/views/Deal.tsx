import { IAdvertising, IBreeder, IDeal, IDealEvent, IPoultry } from '@cig-platform/types'
import React, { VFC, useMemo, useCallback } from 'react'
import { History, DealInfo, Button } from '@cig-platform/ui'
import { DealEventValueEnum } from '@cig-platform/enums'

import { StyledButton, StyledContainer, StyledHistoryContainer } from './Deal.styles'
import dealInfoFormatter from '../formatters/dealInfoFormatter'

export type DealProps = {
  events?: IDealEvent[];
  poultry: IPoultry;
  advertising: IAdvertising;
  breeder: IBreeder;
  deal: IDeal;
  onConfirmDeal?: ({ advertisingId, poultryId, breederId, dealId }: { advertisingId: string; poultryId: string; breederId: string; dealId: string; }) => void;
  onFinishDeal?: ({ advertisingId, poultryId, breederId, dealId }: { advertisingId: string; poultryId: string; breederId: string; dealId: string; }) => void;
  onCancelDeal?: ({ advertisingId, poultryId, breederId, dealId }: { advertisingId: string; poultryId: string; breederId: string; dealId: string; }) => void;
}

const Deal: VFC<DealProps> = ({
  events = [],
  poultry,
  advertising,
  breeder,
  deal,
  onCancelDeal,
  onConfirmDeal,
  onFinishDeal
}: DealProps) => {
  const dealInfoProps = useMemo(() => dealInfoFormatter({ deal, poultry, advertising, breeder }), [
    deal,
    poultry,
    advertising,
    breeder
  ])

  const handleCancelDeal = useCallback(() => {
    onCancelDeal?.({ 
      advertisingId: advertising?.id,
      breederId: breeder?.id,
      dealId: deal?.id,
      poultryId: poultry?.id
    })
  }, [onCancelDeal, advertising?.id, breeder?.id, deal?.id, poultry?.id])

  const handleConfirmDeal = useCallback(() => {
    onConfirmDeal?.({ 
      advertisingId: advertising?.id,
      breederId: breeder?.id,
      dealId: deal?.id,
      poultryId: poultry?.id
    })
  }, [onConfirmDeal, advertising?.id, breeder?.id, deal?.id, poultry?.id])

  const handleFinishDeal = useCallback(() => {
    onFinishDeal?.({ 
      advertisingId: advertising?.id,
      breederId: breeder?.id,
      dealId: deal?.id,
      poultryId: poultry?.id
    })
  }, [onFinishDeal, advertising?.id, breeder?.id, deal?.id, poultry?.id])

  const isCancelled = useMemo(() => events.some(e => e.value === DealEventValueEnum.cancelled), [events])
  const isPlaced = useMemo(() => events.some(e => e.value === DealEventValueEnum.placed), [events])
  const isConfirmed = useMemo(() => events.some(e => e.value === DealEventValueEnum.confirmed), [events])
  const isFinished = useMemo(() => events.some(e => e.value === DealEventValueEnum.received), [events])

  return (
    <StyledContainer>
      <DealInfo {...dealInfoProps} />
      <StyledHistoryContainer>
        <History events={events} />
      </StyledHistoryContainer>
      <StyledButton>
        {Boolean(!isCancelled && !isFinished && isPlaced && onCancelDeal) && (
          <Button onClick={handleCancelDeal}>
            Cancelar
          </Button>
        )}

        {Boolean(!isCancelled && !isConfirmed && isPlaced && onConfirmDeal) && (
          <Button onClick={handleConfirmDeal}>
            Confirmar
          </Button>
        )}

        {Boolean(!isCancelled && isConfirmed && isPlaced && !isFinished && onConfirmDeal) && (
          <Button onClick={handleFinishDeal}>
            Finalizar
          </Button>
        )}
      </StyledButton>
    </StyledContainer>
  )
}

export default Deal
