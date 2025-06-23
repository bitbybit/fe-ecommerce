import { type ReactElement } from 'react'
import SchoolIcon from '~/assets/images/school-logo.svg'

export function SchoolLogo(): ReactElement {
  return (
    <div className="flex justify-center mt-8">
      <a href="https://rs.school/" target="_blank" title="RSSchool">
        <img src={SchoolIcon} alt="RSSchool logo" className="h-12 transition-all hover:brightness-90" />
      </a>
    </div>
  )
}
