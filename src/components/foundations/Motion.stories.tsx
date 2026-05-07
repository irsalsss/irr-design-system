import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { duration, easing } from '../../tokens'

const meta = {
  title: 'Foundations/Motion',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

function AnimatedBar({
  dur,
  ease,
  token,
}: {
  label?: string
  dur: string
  ease: string
  token: string
}) {
  const [active, setActive] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="w-28 shrink-0">
          <p className="text-xs font-mono text-fg">{token}</p>
          <p className="text-xs font-mono text-fg-muted">{dur}</p>
        </div>
        <div className="flex-1 h-10 bg-bg-subtle rounded-md overflow-hidden relative">
          <div
            className="absolute inset-y-0 left-0 bg-brand rounded-md"
            style={{
              width: active ? '100%' : '0%',
              transition: `width ${dur} ${ease}`,
            }}
          />
        </div>
      </div>
      <button
        onClick={() => setActive(v => !v)}
        className="self-start text-xs font-mono px-3 py-1 rounded-md bg-bg-muted text-fg-muted hover:text-fg transition-colors"
      >
        {active ? 'reset' : 'play'}
      </button>
    </div>
  )
}

export const Duration: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <p className="text-sm text-fg-muted">Click play on each to compare durations.</p>
      <AnimatedBar
        token="duration-fast"
        label="fast"
        dur={duration.fast}
        ease={easing.out}
      />
      <AnimatedBar
        token="duration-base"
        label="base"
        dur={duration.base}
        ease={easing.out}
      />
      <AnimatedBar
        token="duration-slow"
        label="slow"
        dur={duration.slow}
        ease={easing.out}
      />
    </div>
  ),
}

export const Easing: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <p className="text-sm text-fg-muted">Same duration (280ms), different easing curves.</p>
      <AnimatedBar
        token="ease-out"
        label="ease-out"
        dur={duration.slow}
        ease={easing.out}
      />
      <AnimatedBar
        token="ease-in-out"
        label="ease-in-out"
        dur={duration.slow}
        ease={easing.inOut}
      />
    </div>
  ),
}
