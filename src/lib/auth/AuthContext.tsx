import { createContext, FunctionComponent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  User,
  Session,
  AuthChangeEvent,
  Provider,
  UserCredentials,
} from '@supabase/supabase-js'
import { supabase } from '~/lib/supabase'
import { useMessage } from '~/lib/message'
import { ROUTE_HOME, ROUTE_AUTH } from '~/config'

export type AuthContextProps = {
  user: User
  signUp: (payload: UserCredentials) => void
  signIn: (payload: UserCredentials) => void
  signInWithProvider: (provider: Provider) => Promise<void>
  signOut: () => void
  loggedIn: boolean
  loading: boolean
  userLoading: boolean
}

export const AuthContext = createContext<Partial<AuthContextProps>>({})

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(false)
  const [userLoading, setUserLoading] = useState(true)
  const [loggedIn, setLoggedin] = useState(false)
  const { handleMessage } = useMessage()
  const router = useRouter()

  const signUp = async (payload: UserCredentials) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp(payload)
      if (error) {
        handleMessage({ message: error.message, type: 'error' })
      } else {
        handleMessage({
          message:
            'Signup successful. Please check your inbox for a confirmation email!',
          type: 'success',
        })
      }
    } catch (error) {
      handleMessage({
        message: error.error_description || error,
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (payload: UserCredentials) => {
    try {
      setLoading(true)
      const { error, user } = await supabase.auth.signIn(payload)
      if (error) {
        handleMessage({ message: error.message, type: 'error' })
      } else {
        handleMessage({
          message: payload.password.length
            ? `Welcome, ${user.email}`
            : `Please check your email for the magic link`,
          type: 'success',
        })
      }
    } catch (error) {
      handleMessage({
        message: error.error_description || error,
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const signInWithProvider = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signIn({ provider })
      if (error) {
        handleMessage({ message: error.message, type: 'error' })
      }
    } catch (error) {
      handleMessage({
        message: error.error_description || error,
        type: 'error',
      })
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        handleMessage({ message: error.message, type: 'error' })
      }
    } catch (error) {
      handleMessage({
        message: error.error_description || error,
        type: 'error',
      })
    }
  }

  const setServerSession = async (event: AuthChangeEvent, session: Session) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  useEffect(() => {
    const user = supabase.auth.user()

    if (user) {
      setUser(user)
      setUserLoading(false)
      setLoggedin(true)
      router.push(ROUTE_HOME)
    } else {
      setUserLoading(false)
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user! ?? null
        setUserLoading(false)
        await setServerSession(event, session)
        if (user) {
          setUser(user)
          setLoggedin(true)
          router.push(ROUTE_HOME)
        } else {
          setUser(null)
          router.push(ROUTE_AUTH)
        }
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signInWithProvider,
        signOut,
        loggedIn,
        loading,
        userLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
