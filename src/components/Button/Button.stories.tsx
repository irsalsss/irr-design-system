import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: { autodocs: true },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Create workspace', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Cancel', variant: 'secondary' },
}

export const Ghost: Story = {
  args: { children: 'Learn more', variant: 'ghost' },
}

export const Danger: Story = {
  args: { children: 'Delete workspace', variant: 'danger' },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const Loading: Story = {
  args: { children: 'Saving', loading: true },
}

export const Disabled: Story = {
  args: { children: 'Unavailable', disabled: true },
}

export const ClickInteraction: Story = {
  args: { children: 'Click me', variant: 'primary' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /click me/i })
    await userEvent.click(button)
    await expect(button).toBeInTheDocument()
  },
}
