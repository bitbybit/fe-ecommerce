import type { ReactElement } from 'react'
import { Button } from '~/components/ui/button'
import { useNavigate } from 'react-router'

export const RegisterLink = (): ReactElement => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 px-6 flex items-center justify-center">
      <span className="text-xs m-[0]">Don't have an account?</span>
      <Button type="button" variant="link" onClick={() => void navigate('/auth/register')}>
        Sign up
      </Button>
    </div>
  )
}
