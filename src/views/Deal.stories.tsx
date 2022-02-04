import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import Deal from './Deal'

export default {
  title: 'Deal',
  component: Deal,
} as ComponentMeta<typeof Deal>

const Template: ComponentStory<typeof Deal> = (args) => <Deal {...args} />

export const Example = Template.bind({})
Example.args = {
}
