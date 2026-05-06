import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { ButtonIcon } from './ButtonIcon'

// ── Inline SVG icons used in stories ─────────────────────────────────────────

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
)

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────

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
  args: { label: 'Edit', variant: 'secondary', icon: <EditIcon /> },
}

export const Ghost: Story = {
  args: { label: 'Settings', variant: 'ghost', icon: <SettingsIcon /> },
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
  args: { label: 'Unavailable', disabled: true, icon: <EditIcon /> },
}

export const AllVariants = {
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonIcon variant="primary"   label="Add"      icon={<PlusIcon />} />
      <ButtonIcon variant="secondary" label="Edit"     icon={<EditIcon />} />
      <ButtonIcon variant="ghost"     label="Settings" icon={<SettingsIcon />} />
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
