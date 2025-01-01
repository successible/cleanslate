import { JSX } from '@emotion/react/jsx-runtime'
import { isMobile } from '../../helpers/isMobile'
import { sidebarPresent } from '../modal/helpers/sidebarPresent'

export const getOrderedModals = (
  modalsToRender: JSX.Element[],
  modals: readonly any[],
  activeModals: readonly any[]
) => {
  const match = (name: string) =>
    modalsToRender.find((modal) => modal.props.name === name)

  // Map the string, name (e.g. sharedNavbar.alertVisibility) to the JSX modal
  // Thereby preserving the modal order
  const inactiveModals = modals.filter((modal) => !activeModals.includes(modal))
  const showInactive = isMobile() || sidebarPresent()
  const orderedModals = [
    ...activeModals.map(match),
    // We only need to render the inactive modals on mobile to preserve the transitions...
    ...(showInactive ? inactiveModals.map(match) : []),
  ]
  return orderedModals
}
