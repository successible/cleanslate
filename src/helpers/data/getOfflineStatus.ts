import { useStoreon } from 'storeon/react'
import { NavbarState } from '../../store/navbar/types'

export const getOfflineStatus = () => {
  const { navbar }: { navbar: NavbarState } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStoreon('navbar')
  return navbar.offline
}
