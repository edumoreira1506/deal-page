import {
  IAdvertising,
  IPoultry,
  IBreeder,
  IDeal,
  IDealEvent,
  IBreederContact
} from '@cig-platform/types'
import { useData as useDataFromDataHelper } from '@cig-platform/data-helper'

import BackofficeBffService from '../services/BackofficeBffService'

interface Data {
  poultry: IPoultry;
  advertising: IAdvertising;
  breeder: IBreeder;
  deal: IDeal;
  events: IDealEvent[];
  breederContacts: IBreederContact[];
}

export default function useData(breederId: string, dealId: string) {
  return useDataFromDataHelper<Data>(
    'getPoultryData',
    () => BackofficeBffService.getDeal(breederId, dealId, window.localStorage.getItem('token') ?? ''),
    [breederId, dealId],
    {}
  )
}
