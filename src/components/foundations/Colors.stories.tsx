import type { Meta, StoryObj } from '@storybook/react'
import { colors } from '../../tokens'

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-12 w-full rounded-md border border-black/10"
        style={{ background: hex }}
      />
      <p className="text-xs font-mono text-fg">{name}</p>
      <p className="text-xs font-mono text-fg-muted">{hex}</p>
    </div>
  )
}

function SwatchRow({ label, palette }: { label: string; palette: Record<string | number, string> }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-fg">{label}</h3>
      <div className="grid grid-cols-11 gap-2">
        {Object.entries(palette).map(([step, hex]) => (
          <Swatch key={step} name={step} hex={hex} />
        ))}
      </div>
    </div>
  )
}

function SemanticToken({ name, variable }: { name: string; variable: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-8 w-8 rounded-md border border-black/10 shrink-0"
        style={{ background: `var(${variable})` }}
      />
      <div>
        <p className="text-xs font-mono text-fg">{name}</p>
        <p className="text-xs font-mono text-fg-subtle">{variable}</p>
      </div>
    </div>
  )
}

export const Palette: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <SwatchRow label="Teal" palette={colors.teal} />
      <SwatchRow label="Stone" palette={colors.stone} />
      <SwatchRow label="Amber" palette={colors.amber} />
    </div>
  ),
}

export const Semantic: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-fg">Background</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SemanticToken name="bg" variable="--bg" />
          <SemanticToken name="bg-elevated" variable="--bg-elevated" />
          <SemanticToken name="bg-subtle" variable="--bg-subtle" />
          <SemanticToken name="bg-muted" variable="--bg-muted" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-fg">Foreground</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <SemanticToken name="fg" variable="--fg" />
          <SemanticToken name="fg-muted" variable="--fg-muted" />
          <SemanticToken name="fg-subtle" variable="--fg-subtle" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-fg">Border</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
          <SemanticToken name="border" variable="--border" />
          <SemanticToken name="border-strong" variable="--border-strong" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-fg">Brand</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SemanticToken name="brand" variable="--brand" />
          <SemanticToken name="brand-hover" variable="--brand-hover" />
          <SemanticToken name="brand-active" variable="--brand-active" />
          <SemanticToken name="brand-subtle" variable="--brand-subtle" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-fg">Accent</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <SemanticToken name="accent" variable="--accent" />
          <SemanticToken name="accent-hover" variable="--accent-hover" />
          <SemanticToken name="accent-subtle" variable="--accent-subtle" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-fg">Status</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SemanticToken name="success" variable="--color-success" />
          <SemanticToken name="warning" variable="--color-warning" />
          <SemanticToken name="danger" variable="--color-danger" />
          <SemanticToken name="info" variable="--color-info" />
        </div>
      </div>
    </div>
  ),
}
