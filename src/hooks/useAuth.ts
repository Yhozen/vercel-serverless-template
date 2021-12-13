import { useEffect } from 'react'
import { logout } from 'helpers/logout'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = async (route: string) => {
  /* our token cookie gets sent with this request */
  try {
    const response = await fetch(route)
    const user = await response.json()

    return user || null
  } catch (error) {
    return null
  }
}

export const useAuth = () => {
  const { data: user, error } = useSWR('/api/user', fetcher)
  const isloading = user === undefined
  const router = useRouter()

  useEffect(() => {
    if (user === null) logout()
  }, [user, router])

  return {
    user,
    isloading,
    error,
  }
}
