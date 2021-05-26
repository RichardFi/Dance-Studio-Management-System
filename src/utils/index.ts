// import React from 'react';
import { useEffect, useState } from 'react'

export const isFalsy = (value: any) => value === 0 ? false : !value

// clean null values in an object
export const cleanObject = (object: object) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    // @ts-expect-error
    const value = result[key]
    if (isFalsy(value)) {
      // @ts-expect-error
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // setTimeout when value changes
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // clearTimeout after the last useEffect
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
