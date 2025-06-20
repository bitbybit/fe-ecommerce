import { type ReactElement } from 'react'
import { H2 } from '~/components/ui/typography'
import { GithubLink } from './GithubLink'
import { InfoLine } from './InfoLine'

type TeamMemberProps = {
  name: string
  location?: string
  education?: string
  courses: string
  about: string
  github: string
  imageUrl: string
}

export function TeamMember({
  name,
  location,
  education,
  courses,
  about,
  github,
  imageUrl
}: TeamMemberProps): ReactElement {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
      <img
        src={imageUrl}
        width={300}
        height={500}
        className="rounded-2xl md:w-[300px] md:h-auto object-cover"
        alt={name}
      />
      <div className="flex flex-col text-left self-start">
        <H2>{name}</H2>
        <InfoLine label="Location" text={location} />
        <InfoLine label="Education" text={education} />
        <InfoLine label="Courses" text={courses} />
        <InfoLine label="About me" text={about} />
        <GithubLink url={github} />
      </div>
    </div>
  )
}
