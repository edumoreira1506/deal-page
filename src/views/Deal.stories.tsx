import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { BreederContactTypeEnum } from '@cig-platform/enums'

import Deal from './Deal'

export default {
  title: 'Deal',
  component: Deal,
} as ComponentMeta<typeof Deal>

const Template: ComponentStory<typeof Deal> = (args) => <Deal {...args} />

export const Example = Template.bind({})
Example.args = {
  events: [
    {
      value: 'PLACED',
      createdAt: new Date(),
      dealId: '',
      id: '',
      metadata: {
        value: 15000,
        description: 'Vou chamá-lo no whats app para trocar uma ideia'
      }
    },
    {
      value: 'CONFIRMED',
      createdAt: new Date(),
      dealId: '',
      id: '',
      metadata: {}
    },
    {
      value: 'RECEIVED',
      createdAt: new Date(),
      dealId: '',
      id: '',
      metadata: {}
    }
  ],
  advertising: {
    externalId: '',
    finished: true,
    id: '',
    price: 15000,
  },
  breeder: {
    name: 'Criatório bacana',
    active: true,
    id: '',
    address: {
      city: '',
      latitude: 0,
      longitude: 0,
      number: 0,
      province: '',
      street: '',
      zipcode: ''
    },
    code: 'ABC',
    description: '',
    foundationDate: new Date(),
    profileImageUrl: ''
  },
  deal: {
    advertisingId: '',
    buyerId: '',
    cancelled: false,
    createdAt: new Date(),
    finished: true,
    id: '',
    sellerId: '',
  },
  poultry: {
    active: true,
    birthDate: new Date(),
    name: 'Claudinho',
    colors: {},
    crest: '',
    description: '',
    dewlap: '',
    gender: '',
    genderCategory: '',
    id: '',
    number: 0,
    register: '',
    tail: '',
    type: '',
    videos: {}
  },
  breederContacts: [
    {
      breederId: '',
      id: '',
      type: BreederContactTypeEnum.WHATS_APP,
      value: '(15) 99644-2031'
    }
  ],
  onCancelDeal: action('onCancelDeal'),
  onFinishDeal: action('onFinishDeal'),
  onConfirmDeal: action('onConfirmDeal'),
}
