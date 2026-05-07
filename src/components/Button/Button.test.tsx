import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Create workspace</Button>)
    expect(screen.getByRole('button', { name: 'Create workspace' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when loading', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows spinner when loading', () => {
    render(<Button loading>Saving</Button>)
    expect(screen.getByRole('button').querySelector('[aria-hidden]')).toBeTruthy()
  })

  // ── A11y ──────────────────────────────────────────────────────────────────

  it('has no axe violations — default', async () => {
    const { container } = render(<Button>Save</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations — disabled', async () => {
    const { container } = render(<Button disabled>Save</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations — loading', async () => {
    const { container } = render(<Button loading>Save</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations — danger variant', async () => {
    const { container } = render(<Button variant="danger">Delete</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('sets aria-busy when loading', () => {
    render(<Button loading>Saving</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  it('announces loading state to screen readers', () => {
    render(<Button loading loadingLabel="Saving changes">Submit</Button>)
    expect(screen.getByText('Saving changes')).toHaveClass('sr-only')
  })

  it('uses custom loadingLabel', () => {
    render(<Button loading loadingLabel="Uploading file">Upload</Button>)
    expect(screen.getByText('Uploading file')).toBeInTheDocument()
  })

  it('is keyboard accessible — activates on Enter', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Submit</Button>)
    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is keyboard accessible — activates on Space', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Submit</Button>)
    screen.getByRole('button').focus()
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Submit</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('does not fire onClick when loading', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button loading onClick={onClick}>Submit</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
