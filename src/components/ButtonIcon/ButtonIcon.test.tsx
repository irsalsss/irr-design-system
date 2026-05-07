import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { ButtonIcon } from './ButtonIcon'

expect.extend(toHaveNoViolations)

const icon = <svg data-testid="icon" />

describe('ButtonIcon', () => {
  it('renders with aria-label', () => {
    render(<ButtonIcon label="Add item" icon={icon} />)
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<ButtonIcon label="Add item" icon={icon} onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is set', () => {
    render(<ButtonIcon label="Add item" icon={icon} disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when loading', () => {
    render(<ButtonIcon label="Add item" loading />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows spinner when loading and hides icon', () => {
    render(<ButtonIcon label="Add item" loading icon={icon} />)
    const button = screen.getByRole('button')
    expect(button.querySelector('[aria-hidden]')).toBeTruthy()
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
  })

  it('renders icon when not loading', () => {
    render(<ButtonIcon label="Add item" icon={icon} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  // ── A11y ──────────────────────────────────────────────────────────────────

  it('has no axe violations — default', async () => {
    const { container } = render(<ButtonIcon label="Close dialog" icon={icon} />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations — disabled', async () => {
    const { container } = render(<ButtonIcon label="Close dialog" icon={icon} disabled />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations — loading', async () => {
    const { container } = render(<ButtonIcon label="Close dialog" loading />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations — danger variant', async () => {
    const { container } = render(<ButtonIcon label="Delete item" icon={icon} variant="danger" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('icon is hidden from screen readers', () => {
    render(<ButtonIcon label="Add item" icon={icon} />)
    const wrapper = screen.getByRole('button').querySelector('[aria-hidden]')
    expect(wrapper).toBeTruthy()
  })

  it('is keyboard accessible — activates on Enter', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<ButtonIcon label="Add item" icon={icon} onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is keyboard accessible — activates on Space', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<ButtonIcon label="Add item" icon={icon} onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<ButtonIcon label="Add item" icon={icon} disabled onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('does not fire onClick when loading', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<ButtonIcon label="Add item" loading onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
