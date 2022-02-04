import { IAdvertising, IBreeder, IDeal, IPoultry } from '@cig-platform/types'

const getDealStatus = (deal: IDeal) => {
  if (deal.cancelled) return 'CANCELLED' as const
  if (deal.finished) return 'FINISHED' as const
  return 'IN_PROGRESS' as const
}

const dealInfoFormatter = ({
  deal,
  advertising,
  breeder,
  poultry
}: {
  deal: IDeal;
  advertising: IAdvertising;
  breeder: IBreeder;
  poultry: IPoultry;
}) => {
  const status = getDealStatus(deal)

  return {
    advertising,
    breeder,
    date: new Date(deal.createdAt),
    poultry: poultry,
    status,
  }
}

export default dealInfoFormatter
