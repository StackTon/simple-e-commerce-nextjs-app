export function getFromStorage(key: string): unknown {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as unknown) : null
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error)
    return null
  }
}

export function saveToStorage(key: string, value: unknown): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error)
    return false
  }
}

export function removeFromStorage(key: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    window.localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error)
    return false
  }
}
