import { useStoreon } from 'storeon/react'
import { Data } from './data/types'
import { extractData } from './extractData'
import { NavbarState } from './navbar/types'
import { AllEvents } from './store'
import { Dispatch } from './types'

export const getData = () => {
  const {
    data,
    dispatch,
    navbar,
  }: {
    data: Data
    navbar: NavbarState
    dispatch: Dispatch<AllEvents>
  } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useStoreon('data', 'navbar')

  return {
    dispatch,
    ...extractData(data),
    navbar,
    offline: navbar.offline,
  }
}
