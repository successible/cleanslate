import { useStoreon } from 'storeon/react'
import { NavbarState } from '../store/navbar/types'

export const useUser = () => {
  const { navbar }: { navbar: NavbarState } = useStoreon('navbar')
  const { user } = navbar
  return user
}
