import { type ReactElement } from 'react'
import instagram from '~/assets/images/social-media/instagram.svg'
import meta from '~/assets/images/social-media/meta.svg'
import linkedin from '~/assets/images/social-media/linkedin.png'
import telegram from '~/assets/images/social-media/telegram.svg'

const socialIcons = [
  { src: instagram, alt: 'Instagram', href: 'https://www.instagram.com' },
  { src: telegram, alt: 'Telegram', href: 'https://t.me' },
  { src: meta, alt: 'Meta', href: 'https://www.meta.com/about/' },
  { src: linkedin, alt: 'LinkedIn', href: 'https://www.linkedin.com' }
]

export function SocialMedia(): ReactElement {
  return (
    <div className="ml-4">
      <h4 className="font-semibold text-black mb-3">Social Media</h4>
      <div className="flex flex-wrap gap-3">
        {socialIcons.map(({ src, alt, href }) => (
          <a key={alt} href={href} target="_blank" className="w-8 h-8 rounded flex items-center justify-center">
            <img src={src} alt={alt} className="w-8 h-8" />
          </a>
        ))}
      </div>
    </div>
  )
}
