import type { Meta, StoryObj } from '@storybook/react'
import { spacing } from '../../tokens'

const meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      {(Object.entries(spacing) as [string, string][]).map(([token, value]) => {
        const px = parseInt(value)
        return (
          <div key={token} className="flex items-center gap-4">
            <div className="w-16 shrink-0 text-right">
              <p className="text-xs font-mono text-fg-muted">space-{token}</p>
            </div>
            <div className="w-14 shrink-0 text-right">
              <p className="text-xs font-mono text-fg-subtle">{value}</p>
            </div>
            <div
              className="bg-brand rounded-sm h-5 shrink-0"
              style={{ width: value }}
            />
            <div
              className="h-px flex-1 border-t border-dashed border-border"
            />
            <p className="text-xs font-mono text-fg-subtle shrink-0">{px / 4}× base</p>
          </div>
        )
      })}
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="p-4 flex flex-col gap-6">
      <p className="text-sm text-fg-muted font-mono">4pt base grid — all values multiples of 4px</p>
      <div className="flex flex-wrap gap-4">
        {(Object.entries(spacing) as [string, string][]).map(([token, value]) => (
          <div key={token} className="flex flex-col items-center gap-2">
            <div
              className="bg-brand/20 border border-brand rounded-sm flex items-center justify-center"
              style={{ width: value, height: value, minWidth: '4px', minHeight: '4px' }}
            />
            <p className="text-xs font-mono text-fg-muted">{value}</p>
          </div>
        ))}
      </div>
    </div>
  ),
}
