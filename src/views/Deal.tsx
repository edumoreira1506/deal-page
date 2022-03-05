import { IAdvertising, IBreeder, IBreederContact, IDeal, IDealEvent, IPoultry } from '@cig-platform/types'
import React, { VFC, useMemo, useCallback } from 'react'
import { History, DealInfo, Button } from '@cig-platform/ui'
import { BreederContactTypeEnum, DealEventValueEnum } from '@cig-platform/enums'

import { StyledButton, StyledContainer, StyledHistoryContainer } from './Deal.styles'
import dealInfoFormatter from '../formatters/dealInfoFormatter'

export type DealProps = {
  events?: IDealEvent[];
  breederContacts?: IBreederContact[];
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
  onFinishDeal,
  breederContacts = []
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

  const whatsAppContact = useMemo(() => breederContacts.find((c) => c.type === BreederContactTypeEnum.WHATS_APP), [breederContacts])

  const handleWhatsAppClick = useCallback(() => {
    if (whatsAppContact) {
      window.location.assign(`https://api.whatsapp.com/send?phone=55${whatsAppContact.value.replace(/\D/g, '')}`)
    }
  }, [whatsAppContact])

  return (
    <StyledContainer>
      <DealInfo {...dealInfoProps} />

      {Boolean(whatsAppContact && !isFinished && !isCancelled && isConfirmed) && (
        <StyledButton>
          <Button onClick={handleWhatsAppClick}>
            Chamar no whats app
          </Button>
        </StyledButton>
      )}

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

        {Boolean(!isCancelled && isConfirmed && isPlaced && !isFinished && onFinishDeal) && (
          <Button onClick={handleFinishDeal}>
            Finalizar
          </Button>
        )}
      </StyledButton>
    </StyledContainer>
  )
}

export default Deal
