import { magic } from 'helpers/magic'
import router from 'next/router'
import nookies from 'nookies'

export const logout = async () => {
  const authed = nookies.get(null, 'authed')
  const token = nookies.get(null, 'api_token')

  await magic.user.logout()

  if (authed || token) {
    await fetch('/api/logout', {
      method: 'POST',
    })
    router.push('/backoffice')
  } else router.push('/backoffice')
}
