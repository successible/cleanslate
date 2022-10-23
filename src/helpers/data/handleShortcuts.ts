import React from 'react'

export const handleShortcuts = (shortcuts: (event: KeyboardEvent) => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    window.addEventListener('keyup', shortcuts)
    return () => {
      window.removeEventListener('keyup', shortcuts)
    }
  }, [shortcuts])
}
