import type { NavbarState } from '../store/navbar/types'
import { useStoreon } from '../storeon'

export const useOfflineStatus = () => {
  const { navbar }: { navbar: NavbarState } = useStoreon('navbar')
  return navbar.offline
}
