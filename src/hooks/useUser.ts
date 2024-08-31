import type { NavbarState } from '../store/navbar/types'
import { useStoreon } from '../storeon'

export const useUser = () => {
  const { navbar }: { navbar: NavbarState } = useStoreon('navbar')
  const { user } = navbar
  return user
}
