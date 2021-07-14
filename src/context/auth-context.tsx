import React, { useState, ReactNode } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/classList/searchPanel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/useAsync'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'

interface AuthForm {
  email: string
  password: string
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()

  if (token) {
    const data = await http('auth', { token })
    user = data.user
    user.token = token
  }
  console.log(user)
  return user
}

interface Register {
  firstName: string
  lastName: string
  gender: string
  phone: string
  email: string
  password: string
}

const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: Register) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser
  } = useAsync<User | null>()
  const login = async (form: AuthForm) => await auth.login(form).then(setUser)
  const register = async (form: Register) =>
    await auth.register(form).then(setUser)
  const logout = async () => await auth.logout().then(() => setUser(null))
  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context == null) {
    throw new Error('useAuth must be used in AuthProvider')
  }
  return context
}
