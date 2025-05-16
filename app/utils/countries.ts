import { registerLocale, getNames } from 'i18n-iso-countries'
import countryNames from 'i18n-iso-countries/langs/en.json'

registerLocale(countryNames)

export const countries = getNames('en', { select: 'official' })

export const countryCodes = Object.keys(countries)
