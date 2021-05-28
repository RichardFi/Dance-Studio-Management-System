import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'
// import { config } from 'node:process';

const apiUrl = process.env.REACT_APP_API_URL
interface Config extends RequestInit {
  token?: string
  data?: object
};

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    console.log(config)
    config.body = JSON.stringify(data || {})
  }
  return await window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        await auth.logout()
        window.location.reload()
        return await Promise.reject(response.json())
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return await Promise.reject(data)
      }
    })
}

export const useHttp = () => {
  const { user } = useAuth()
  return async (...[endpoint, config]: Parameters<typeof http>) => await http(endpoint, { ...config, token: user?.token })
}
