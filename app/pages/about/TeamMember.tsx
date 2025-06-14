import { type ReactElement } from 'react'
import { H2, P } from '~/components/ui/typography'
import { GithubLink } from './GithubLink'

interface TeamMemberProperties {
  name: string
  location?: string
  education?: string
  courses: string
  about: string
  github: string
  imageUrl: string
  reverse?: boolean
}

function InfoLine({ label, text }: { label: string; text?: string }): ReactElement | undefined {
  if (!text) return undefined
  return (
    <P className="!mt-1">
      <span className="font-bold">{label}:</span> {text}
    </P>
  )
}

export function TeamMember({
  name,
  location,
  education,
  courses,
  about,
  github,
  imageUrl,
  reverse = false
}: TeamMemberProperties): ReactElement {
  return (
    <div
      className={`max-w-7xl mx-auto flex flex-col ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      } gap-8 items-center`}
    >
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
