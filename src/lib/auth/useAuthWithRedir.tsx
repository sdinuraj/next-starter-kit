import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from './useAuth'
import { ROUTE_AUTH } from '~/config'

export const useAuthWithRedir = () => {
  const context = useAuth()
  const router = useRouter()
  const { userLoading, loggedIn } = context

  useEffect(() => {
    if (!userLoading && !loggedIn) {
      router.push(ROUTE_AUTH)
    }
  }, [userLoading, loggedIn, router])

  return context
}
