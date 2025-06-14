import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { teamMembers, aboutUsText } from './aboutData'
import { AboutText } from './AboutText'
import { SchoolLogo } from './SchoolLogo'
import { TeamMember } from './TeamMember'

export default function About(): ReactElement {
  useTitle('About')

  return (
    <section className="w-full px-6 md:px-8 py-16 bg-background text-foreground ">
      <AboutText text={aboutUsText} />
      <div className="flex flex-col max-w-7xl gap-8 mx-auto">
        {teamMembers.map((member) => (
          <TeamMember key={member.name} {...member} />
        ))}
      </div>
      <SchoolLogo />
    </section>
  )
}
