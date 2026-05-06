import { GearIcon, Pencil2Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { ButtonIcon } from './ButtonIcon'

const meta = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
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
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof ButtonIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { label: 'Add item', variant: 'primary', icon: <PlusIcon /> },
}

export const Secondary: Story = {
  args: { label: 'Edit', variant: 'secondary', icon: <Pencil2Icon /> },
}

export const Ghost: Story = {
  args: { label: 'Settings', variant: 'ghost', icon: <GearIcon /> },
}

export const Danger: Story = {
  args: { label: 'Delete', variant: 'danger', icon: <TrashIcon /> },
}

export const Sizes = {
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonIcon size="sm" label="Add small"  icon={<PlusIcon />} />
      <ButtonIcon size="md" label="Add medium" icon={<PlusIcon />} />
      <ButtonIcon size="lg" label="Add large"  icon={<PlusIcon />} />
    </div>
  ),
}

export const Loading: Story = {
  args: { label: 'Saving', loading: true },
}

export const Disabled: Story = {
  args: { label: 'Unavailable', disabled: true, icon: <Pencil2Icon /> },
}

export const AllVariants = {
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonIcon variant="primary"   label="Add"      icon={<PlusIcon />} />
      <ButtonIcon variant="secondary" label="Edit"     icon={<Pencil2Icon />} />
      <ButtonIcon variant="ghost"     label="Settings" icon={<GearIcon />} />
      <ButtonIcon variant="danger"    label="Delete"   icon={<TrashIcon />} />
    </div>
  ),
}

export const ClickInteraction: Story = {
  args: { label: 'Add item', variant: 'primary', icon: <PlusIcon /> },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /add item/i })
    await userEvent.click(button)
    await expect(button).toBeInTheDocument()
  },
}
