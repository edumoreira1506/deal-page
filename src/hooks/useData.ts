import {
  IAdvertising,
  IPoultry,
  IBreeder,
  IDeal,
  IDealEvent
} from '@cig-platform/types'
import { useQuery } from 'react-query'

import BackofficeBffService from '../services/BackofficeBffService'

interface Data {
  poultry: IPoultry;
  advertising: IAdvertising;
  breeder: IBreeder;
  deal: IDeal;
  events: IDealEvent[];
}

export default function useData(breederId: string, dealId: string) {
  return useQuery<Data>(
    ['getPoultryData', breederId, dealId],
    () => BackofficeBffService.getDeal(breederId, dealId, window.localStorage.getItem('token') ?? '')
  )
}
