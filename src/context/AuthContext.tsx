import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

import supabase from '../data/supabaseClient'
import { Result, err, ok } from '../utils/results'

type AuthContextType = {
  session: Session | null
  isAuthLoading: boolean
  isPasswordRecovery: boolean
  signUp: (email: string, password: string) => Promise<Result<Session, Error>>
  signIn: (email: string, password: string) => Promise<Result<Session, Error>>
  signOut: () => Promise<Result<void, Error>>
  resetPasswordForEmail: (email: string) => Promise<Result<void, Error>>
  updatePassword: (password: string) => Promise<Result<void, Error>>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const UserAuth = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false)

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/signin`,
      },
    })

    if (error) {
      return err<Session>(error)
    }

    if (data?.session) {
      setSession(data.session)
      return ok<Session>(data.session)
    }

    if (data?.user && !data?.session) {
      return err<Session>(new Error('EMAIL_VERIFICATION_REQUIRED'))
    }
    return err<Session>(new Error('Sign up successful but no session was created. Please try signing in.'))
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return err<Session>(error)
      }

      if (data?.session) {
        setSession(data.session)
        setIsPasswordRecovery(false)
        return ok<Session>(data.session)
      }
      return err<Session>(new Error('Sign in successful but no session was created. Please try again.'))
    } catch (error) {
      return err<Session>(error as Error)
    }
  }

  const resetPasswordForEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })
    if (error) {
      return err<void>(error)
    }
    return ok<void>(undefined)
  }

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      return err<void>(error)
    }
    setIsPasswordRecovery(false)
    return ok<void>(undefined)
  }

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session: initialSession } }) => {
        setSession(initialSession)
      })
      .finally(() => {
        setIsAuthLoading(false)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, nextSession) => {
      setSession(nextSession)
      setIsAuthLoading(false)

      switch (event) {
        case 'INITIAL_SESSION':
          break
        case 'PASSWORD_RECOVERY':
          setIsPasswordRecovery(true)
          break
        case 'SIGNED_IN':
          setIsPasswordRecovery(false)
          break
        case 'SIGNED_OUT':
          setIsPasswordRecovery(false)
          break
        case 'TOKEN_REFRESHED':
          break
        case 'USER_UPDATED':
          break
        case 'MFA_CHALLENGE_VERIFIED':
          break
        default: {
          const _exhaustive: never = event
          void _exhaustive
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return err<void>(error)
    }
    setSession(null)
    setIsPasswordRecovery(false)
    return ok<void>(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthLoading,
        isPasswordRecovery,
        signUp,
        signIn,
        signOut,
        resetPasswordForEmail,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
