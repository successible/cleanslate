export const isAlertPresent = (activeModals: readonly any[]) => {
  const activeModalName = activeModals.slice(-1)[0] as string
  const isAlert = activeModalName === 'sharedNavbar.alertVisibility'
  return isAlert
}
