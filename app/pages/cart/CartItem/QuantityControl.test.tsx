import { QuantityControl } from './QuantityControl'
import { renderWithProviders } from '~/utils/test'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('QuantityControl', () => {
  it('display cart item quantity', () => {
    const QUANTITY = 1
    renderWithProviders(<QuantityControl quantity={QUANTITY} onQuantityChange={() => {}} />)
    expect(screen.getByText(QUANTITY)).toBeInTheDocument()
  })

  it('increase cart item quantity', async () => {
    const QUANTITY = 1
    const handleChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<QuantityControl quantity={QUANTITY} onQuantityChange={handleChange} />)
    const increaseButton = screen.getByLabelText('increase-button')

    await user.click(increaseButton)
    expect(handleChange).toHaveBeenCalledWith(2)
  })

  it('display and decrease cart item quantity', async () => {
    const QUANTITY = 2
    const handleChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<QuantityControl quantity={QUANTITY} onQuantityChange={handleChange} />)
    const decreaseButton = screen.getByLabelText('decrease-button')

    await user.click(decreaseButton)
    expect(handleChange).toHaveBeenCalledWith(1)
  })
})
