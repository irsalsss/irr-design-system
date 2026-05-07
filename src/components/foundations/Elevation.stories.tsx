import type { Meta, StoryObj } from '@storybook/react'
import { radius } from '../../tokens'

const meta = {
  title: 'Foundations/Elevation',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta

const shadows = [
  { token: 'shadow-xs', variable: 'var(--shadow-xs)', label: 'xs — subtle lift' },
  { token: 'shadow-sm', variable: 'var(--shadow-sm)', label: 'sm — card default' },
  { token: 'shadow-md', variable: 'var(--shadow-md)', label: 'md — dropdown' },
  { token: 'shadow-lg', variable: 'var(--shadow-lg)', label: 'lg — modal' },
  { token: 'shadow-xl', variable: 'var(--shadow-xl)', label: 'xl — overlay' },
] as const

export const Shadows: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 sm:grid-cols-3 lg:grid-cols-5">
      {shadows.map(({ token, variable, label }) => (
        <div key={token} className="flex flex-col items-center gap-4">
          <div
            className="h-20 w-full rounded-lg bg-bg-elevated"
            style={{ boxShadow: variable }}
          />
          <div className="text-center">
            <p className="text-xs font-mono text-fg">{token}</p>
            <p className="text-xs text-fg-muted">{label.split(' — ')[1]}</p>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Radius: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-end gap-8 p-8">
      {(Object.entries(radius) as [string, string][]).map(([token, value]) => (
        <div key={token} className="flex flex-col items-center gap-3">
          <div
            className="h-16 w-16 border-2 border-brand bg-brand-subtle"
            style={{ borderRadius: value }}
          />
          <div className="text-center">
            <p className="text-xs font-mono text-fg">radius-{token}</p>
            <p className="text-xs font-mono text-fg-muted">{value}</p>
          </div>
        </div>
      ))}
    </div>
  ),
}
