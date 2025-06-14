import { type ReactElement } from 'react'

export function SchoolLogo(): ReactElement {
  return (
    <div className="flex justify-center mt-8">
      <a href="https://rs.school/" target="_blank" title="RSSchool">
        <img
          src="https://raw.githubusercontent.com/zhuravel17/rsschool-cv/main/rs_school_logo-light.ef179aecce62c8d7532aee6bdc69ef42.svg"
          alt="RSSchool logo"
          className="h-12 transition-all hover:brightness-90"
        />
      </a>
    </div>
  )
}
