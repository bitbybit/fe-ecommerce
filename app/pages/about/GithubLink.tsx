import type { ReactElement } from 'react'
import GithubIcon from '~/assets/images/github-icon.png'

export function GithubLink({ url }: { url: string }): ReactElement {
  return (
    <a href={url} target="_blank" className="flex items-center gap-2 hover:opacity-80 transition" rel="noreferrer">
      <img src={GithubIcon} alt="GitHub" className="w-5 h-5" />
      <span className="text-base text-[#24292f] hover:underline font-semibold">{url.split('/').pop()}</span>
    </a>
  )
}
