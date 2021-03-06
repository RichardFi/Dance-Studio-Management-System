import { useState } from 'react'

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const setData = (data: D) => setState({
    data,
    stat: 'success',
    error: null
  })

  const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null
  })

  // run for async request
  const run = async (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('Only accept type of \'Promise\'')
    }
    setState({ ...state, stat: 'loading' })
    return await promise.then(data => {
      setData(data)
      return data
    }).catch(async error => {
      setError(error)
      return await Promise.reject(error)
    })
  }
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state
  }
}
