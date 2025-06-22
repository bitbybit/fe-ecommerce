import { type ReactElement } from 'react'
import paypal from '~/assets/images/payment/paypal.png'
import visa from '~/assets/images/payment/visa.png'
import mastercard from '~/assets/images/payment/mastercard.png'

const paymentIcons = [
  { src: paypal, alt: 'PayPal' },
  { src: visa, alt: 'Visa' },
  { src: mastercard, alt: 'MasterCard' }
]

export function Payment(): ReactElement {
  return (
    <div className="ml-4">
      <h4 className="font-semibold text-black mb-3">We accept</h4>
      <div className="flex flex-wrap gap-3 items-center">
        {paymentIcons.map(({ src, alt }) => (
          <img key={alt} src={src} alt={alt} className="h-10" />
        ))}
      </div>
    </div>
  )
}
