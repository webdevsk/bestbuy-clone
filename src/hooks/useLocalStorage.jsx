import { useEffect, useState } from "react"

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() =>
    key in localStorage
      ? JSON.parse(localStorage.getItem(key))
      : initialValue ?? null,
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}

export default useLocalStorage
