import { useEffect, useState } from 'react'

const isClient = !!(
  typeof window !== 'undefined' && window.document && window.document.createElement
)

const isApiSupported = (api: string): boolean => (typeof window !== 'undefined' ? api in window : false)

/**
 * @link https://github.com/antonioru/beautiful-react-hooks/blob/master/src/useMediaQuery.ts
 * @param mediaQuery 
 * @returns 
 */
const useMediaQuery = (mediaQuery: string) => {
  if (!isClient || !isApiSupported('matchMedia')) {
    return false
  }

  const [isVerified, setIsVerified] = useState(!!window.matchMedia(mediaQuery).matches)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery)
    const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches)

    try {
      mediaQueryList.addEventListener('change', documentChangeHandler)
    } catch (e) {
      // Safari isn't supporting mediaQueryList.addEventListener
      mediaQueryList.addListener(documentChangeHandler)
    }

    documentChangeHandler()
    return () => {
      try {
        mediaQueryList.removeEventListener('change', documentChangeHandler)
      } catch (e) {
        // Safari isn't supporting mediaQueryList.removeEventListener
        mediaQueryList.removeListener(documentChangeHandler)
      }
    }
  }, [mediaQuery])

  return isVerified
}

export default useMediaQuery