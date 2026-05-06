import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ButtonIcon } from './ButtonIcon'

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
})
