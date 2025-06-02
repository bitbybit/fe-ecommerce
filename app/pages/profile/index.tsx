import { type ReactElement } from 'react'
import { useTitle } from '~/hooks/useTitle'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/Tabs'
import { UserDetailBody } from './UserDetail/UserDetailBody'
import { PasswordFormBody } from './PasswordForm/PasswordFormBody'

export default function Profile(): ReactElement {
  useTitle('Profile')

  return (
    <Tabs defaultValue="user" className="flex flex-grow container p-4 mx-auto">
      <TabsList>
        <TabsTrigger value="user">User</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <UserDetailBody />
      </TabsContent>
      <TabsContent value="password">
        <PasswordFormBody />
      </TabsContent>
    </Tabs>
  )
}
