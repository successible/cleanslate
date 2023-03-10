import { useStoreon } from 'storeon/react'
import { extractData } from '../helpers/extractData'
import { Data } from '../store/data/types'
import { NavbarState } from '../store/navbar/types'
import { AllEvents } from '../store/store'
import { Dispatch } from '../store/types'

export const useData = () => {
  const {
    data,
    dispatch,
    navbar,
  }: {
    data: Data
    navbar: NavbarState
    dispatch: Dispatch<AllEvents>
  } = useStoreon('data', 'navbar')

  return {
    dispatch,
    ...extractData(data),
    navbar,
    offline: navbar.offline,
  }
}
