import { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../data/supabaseClient'
import { Session } from '@supabase/supabase-js';
import { Result, err, ok } from '../utils/results';

type AuthContextType = {
  session: Session | null;
  signUp: (email: string, password: string) => Promise<Result<Session, Error>>;
  signIn: (email: string, password: string) => Promise<Result<Session, Error>>;
  signOut: () => Promise<Result<void, Error>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const UserAuth = () => {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return err<Session>(error);
    }

    if (data?.session) {
      setSession(data.session);
      return ok<Session>(data.session);
    }
    return err<Session>(new Error('Sign up successful but no session was created. Please try signing in.'));
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return err<Session>(error);
      }

      if (data?.session) {
        setSession(data.session);
        return ok<Session>(data.session);
      }
      return err<Session>(new Error('Sign in successful but no session was created. Please try again.'));
    } catch (error) {
      return err<Session>(error as Error);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => {
      subscription.unsubscribe();
    }
  }, [])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return err<void>(error);
    }
    setSession(null);
    return ok<void>(undefined);
  }

  return (
    <AuthContext.Provider value={{ session, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
