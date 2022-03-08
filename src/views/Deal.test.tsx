import React from 'react'
import {
  advertisingFactory,
  breederFactory,
  dealFactory,
  poultryFactory,
} from '@cig-platform/factories'
import { render, screen } from '@testing-library/react'

import Deal from './Deal'
import { BreederContactTypeEnum, DealEventValueEnum } from '@cig-platform/enums'
import userEvent from '@testing-library/user-event'

const DEFAULT_PROPS = {
  poultry: poultryFactory(),
  advertising: advertisingFactory(),
  breeder: breederFactory(),
  deal: dealFactory()
}

describe('<Deal />', () => {
  it('renders deal info', () => {
    render(<Deal {...DEFAULT_PROPS} />)

    expect(screen.getByText('Em andamento')).toBeInTheDocument()
    expect(screen.getByText(DEFAULT_PROPS.poultry.name)).toBeInTheDocument()
    expect(screen.getByText(`Negociação com ${DEFAULT_PROPS.breeder.name}`)).toBeInTheDocument()
  })

  it('renders whats app button when deal is in confirmed status', () => {
    const contacts = [{
      breederId: '',
      id: '',
      type: BreederContactTypeEnum.WHATS_APP,
      value: '(15) 3521-3556'
    }]
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.confirmed
      }
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        breederContacts={contacts}
        events={events}
      />
    )

    expect(screen.getByText('Chamar no whats app')).toBeInTheDocument()
  })

  it('does not render whats app button when deal is cancelled', () => {
    const contacts = [{
      breederId: '',
      id: '',
      type: BreederContactTypeEnum.WHATS_APP,
      value: '(15) 3521-3556'
    }]
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.confirmed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.cancelled
      }
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        breederContacts={contacts}
        events={events}
      />
    )

    expect(screen.queryByText('Chamar no whats app')).not.toBeInTheDocument()
  })

  it('does not render whats app button when deal is not confirmed yet', () => {
    const contacts = [{
      breederId: '',
      id: '',
      type: BreederContactTypeEnum.WHATS_APP,
      value: '(15) 3521-3556'
    }]
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        breederContacts={contacts}
        events={events}
      />
    )

    expect(screen.queryByText('Chamar no whats app')).not.toBeInTheDocument()
  })

  it('renders re buy button when deal is cancelled', () => {
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.confirmed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.cancelled
      }
    ]
    const onReBuy = jest.fn()

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onReBuy={onReBuy}
      />
    )

    expect(screen.getByText('Refazer proposta')).toBeInTheDocument()

    userEvent.click(screen.getByText('Refazer proposta'))

    expect(onReBuy).toHaveBeenCalledWith({
      advertisingId: DEFAULT_PROPS.advertising.id,
      breederId: DEFAULT_PROPS.breeder.id,
      poultryId: DEFAULT_PROPS.poultry.id
    })
  })

  it('does not render re buy button when deal is not cancelled', () => {
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.confirmed
      },
    ]
    const onReBuy = jest.fn()

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onReBuy={onReBuy}
      />
    )

    expect(screen.queryByText('Refazer proposta')).not.toBeInTheDocument()
  })

  it('renders cancel button when deal is not canceled or finished', () => {
    const onCancelDeal = jest.fn()
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onCancelDeal={onCancelDeal}
      />
    )

    expect(screen.getByText('Cancelar')).toBeInTheDocument()

    userEvent.click(screen.getByText('Cancelar'))

    expect(onCancelDeal).toHaveBeenCalledWith({
      advertisingId: DEFAULT_PROPS.advertising.id,
      breederId: DEFAULT_PROPS.breeder.id,
      dealId: DEFAULT_PROPS.deal.id,
      poultryId: DEFAULT_PROPS.poultry.id
    })
  })

  it('does not render cancel button when deal is canceled', () => {
    const onCancelDeal = jest.fn()
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.cancelled
      },
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onCancelDeal={onCancelDeal}
      />
    )

    expect(screen.queryByText('Cancelar')).not.toBeInTheDocument()
  })

  it('does not render cancel button when deal is canceled', () => {
    const onCancelDeal = jest.fn()
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.confirmed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.received
      },
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onCancelDeal={onCancelDeal}
      />
    )

    expect(screen.queryByText('Cancelar')).not.toBeInTheDocument()
  })

  it('renders confirm button when deal is not confirmed yet', () => {
    const onConfirmDeal = jest.fn()
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onConfirmDeal={onConfirmDeal}
      />
    )

    expect(screen.getByText('Confirmar')).toBeInTheDocument()

    userEvent.click(screen.getByText('Confirmar'))

    expect(onConfirmDeal).toHaveBeenCalledWith({
      advertisingId: DEFAULT_PROPS.advertising.id,
      breederId: DEFAULT_PROPS.breeder.id,
      dealId: DEFAULT_PROPS.deal.id,
      poultryId: DEFAULT_PROPS.poultry.id
    })
  })

  it('does not render confirm button when deal is confirmed', () => {
    const onConfirmDeal = jest.fn()
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.confirmed
      },
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onConfirmDeal={onConfirmDeal}
      />
    )

    expect(screen.queryByText('Confirmar')).not.toBeInTheDocument()
  })

  it('does not render confirm button when deal is cancelled', () => {
    const onConfirmDeal = jest.fn()
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.cancelled
      },
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onConfirmDeal={onConfirmDeal}
      />
    )

    expect(screen.queryByText('Confirmar')).not.toBeInTheDocument()
  })

  it('renders finish button when deal is confirmed and not confirmed finished yet', () => {
    const onFinishDeal = jest.fn()
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.confirmed
      },
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onFinishDeal={onFinishDeal}
      />
    )

    expect(screen.getByText('Finalizar')).toBeInTheDocument()

    userEvent.click(screen.getByText('Finalizar'))

    expect(onFinishDeal).toHaveBeenCalledWith({
      advertisingId: DEFAULT_PROPS.advertising.id,
      breederId: DEFAULT_PROPS.breeder.id,
      dealId: DEFAULT_PROPS.deal.id,
      poultryId: DEFAULT_PROPS.poultry.id
    })
  })

  it('does not render finish button when deal is not confirmed', () => {
    const onFinishDeal = jest.fn()
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onFinishDeal={onFinishDeal}
      />
    )

    expect(screen.queryByText('Finalizar')).not.toBeInTheDocument()
  })

  it('does not render finish button when deal is finished', () => {
    const onFinishDeal = jest.fn()
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.confirmed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.received
      },
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onFinishDeal={onFinishDeal}
      />
    )

    expect(screen.queryByText('Finalizar')).not.toBeInTheDocument()
  })

  it('does not render finish button when deal is cancelled', () => {
    const onFinishDeal = jest.fn()
    const events = [
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.placed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.confirmed
      },
      {
        createdAt: new Date(),
        dealId: '',
        id: '',
        metadata: {},
        value: DealEventValueEnum.cancelled
      },
    ]

    render(
      <Deal
        {...DEFAULT_PROPS}
        events={events}
        onFinishDeal={onFinishDeal}
      />
    )

    expect(screen.queryByText('Finalizar')).not.toBeInTheDocument()
  })
})
