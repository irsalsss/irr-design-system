import type { Meta, StoryObj } from '@storybook/react'
import { fontSize } from '../../tokens'

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

const displayScales = [
  { token: 'display-2xl', size: fontSize['display-2xl'], lh: '1.1',  ls: '-0.02em' },
  { token: 'display-xl',  size: fontSize['display-xl'],  lh: '1.1',  ls: '-0.02em' },
  { token: 'display-lg',  size: fontSize['display-lg'],  lh: '1.15', ls: '-0.02em' },
  { token: 'display-md',  size: fontSize['display-md'],  lh: '1.2',  ls: '-0.015em' },
  { token: 'display-sm',  size: fontSize['display-sm'],  lh: '1.25', ls: '-0.01em' },
] as const

const bodyScales = [
  { token: 'xl', size: fontSize.xl, lh: '1.5' },
  { token: 'lg', size: fontSize.lg, lh: '1.55' },
  { token: 'md', size: fontSize.md, lh: '1.5' },
  { token: 'sm', size: fontSize.sm, lh: '1.5' },
  { token: 'xs', size: fontSize.xs, lh: '1.4' },
] as const

export const DisplayScale: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {displayScales.map(({ token, size, lh, ls }) => (
        <div key={token} className="flex items-baseline gap-6 border-b border-border pb-4 last:border-0">
          <div className="w-36 shrink-0">
            <p className="text-xs font-mono text-fg-muted">{token}</p>
            <p className="text-xs font-mono text-fg-subtle">{size} / {lh} / {ls}</p>
          </div>
          <p
            className="text-fg font-sans leading-none truncate"
            style={{ fontSize: size, lineHeight: lh, letterSpacing: ls }}
          >
            Earthy & Professional
          </p>
        </div>
      ))}
    </div>
  ),
}

export const BodyScale: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {bodyScales.map(({ token, size, lh }) => (
        <div key={token} className="flex items-baseline gap-6 border-b border-border pb-4 last:border-0">
          <div className="w-36 shrink-0">
            <p className="text-xs font-mono text-fg-muted">{token}</p>
            <p className="text-xs font-mono text-fg-subtle">{size} / {lh}</p>
          </div>
          <p className="text-fg font-sans" style={{ fontSize: size, lineHeight: lh }}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      ))}
    </div>
  ),
}

export const FontFamilies: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-mono text-fg-muted">font-sans — Geist</p>
        <p className="font-sans text-display-md text-fg" style={{ letterSpacing: '-0.015em' }}>
          Aa Bb Cc Dd Ee Ff
        </p>
        <p className="font-sans text-md text-fg-muted">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-mono text-fg-muted">font-mono — Geist Mono</p>
        <p className="font-mono text-display-md text-fg" style={{ letterSpacing: '-0.015em' }}>
          Aa Bb Cc Dd Ee Ff
        </p>
        <p className="font-mono text-md text-fg-muted">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
        </p>
      </div>
    </div>
  ),
}

export const Weights: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {[
        { label: 'font-normal', cls: 'font-normal', weight: '400' },
        { label: 'font-medium', cls: 'font-medium', weight: '500' },
        { label: 'font-semibold', cls: 'font-semibold', weight: '600' },
        { label: 'font-bold', cls: 'font-bold', weight: '700' },
      ].map(({ label, cls, weight }) => (
        <div key={label} className="flex items-center gap-6">
          <div className="w-32 shrink-0">
            <p className="text-xs font-mono text-fg-muted">{label}</p>
            <p className="text-xs font-mono text-fg-subtle">{weight}</p>
          </div>
          <p className={`text-xl text-fg font-sans ${cls}`}>
            Stripe meets Linear
          </p>
        </div>
      ))}
    </div>
  ),
}
