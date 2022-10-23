import React from 'react'
import { isLoadedUser } from '../../../helpers/authentication/isLoadedUser'
import { fetchBasicFoodsKey } from '../../../helpers/data/constants'
import { isBrowser } from '../../../helpers/data/isBrowser'
import { UserStatus } from '../../../store/navbar/types'
import { fetchBasicFoods } from './fetchBasicFoods'

export const handleBasicFoods = (user: UserStatus) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    // Fetch the basic foods after we log in, just in case
    if (
      isBrowser() &&
      localStorage.getItem(fetchBasicFoodsKey) !== 'true' &&
      isLoadedUser(user)
    ) {
      fetchBasicFoods()
    }
  }, [user])
}
