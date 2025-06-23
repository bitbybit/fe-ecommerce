import { type ReactElement } from 'react'
import type { ProductListCategory } from '~/api/namespaces/product'
import { InfoAndHelp } from './InfoAndHelp'
import { FooterCategories } from './FooterCategories'
import { SocialMedia } from './SocialMedia'
import { Payment } from './Payment'

type FooterProps = {
  categories: ProductListCategory[]
}

export function Footer({ categories }: FooterProps): ReactElement {
  return (
    <footer className="bg-white border-t text-sm text-muted-foreground">
      <div className="w-full bg-neutral-900/90 text-white py-6">
        <div className="container mx-auto max-w-[1280px] px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-center md:text-left">
          <div className="text-lg font-semibold">FURNITURE SHOP</div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-base text-white/90 sm:items-center sm:text-right">
            <a
              href="https://maps.app.goo.gl/xQJGyHxvcP5XST3k7"
              target="_blank"
              className="hover:underline whitespace-nowrap"
            >
              📍 Moserstrasse 11, 3014 Bern
            </a>
            <a href="mailto:contact@shop.com" className="hover:underline whitespace-nowrap">
              ✉️ contact@shop.com
            </a>
            <a href="tel:+41353003113" className="hover:underline whitespace-nowrap">
              📞 +41 35 300 31 13
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 px-4 py-10 container mx-auto max-w-[1280px]">
        <InfoAndHelp />
        <FooterCategories categories={categories} />
        <SocialMedia />
        <Payment />
      </div>
    </footer>
  )
}
