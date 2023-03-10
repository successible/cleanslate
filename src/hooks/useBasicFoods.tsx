import React from 'react'
import { fetchBasicFoodsKey } from '../helpers/constants'
import { fetchAllBasicFoods } from '../helpers/Food/fetchAllBasicFoods'
import { isBrowser } from '../helpers/isBrowser'
import { isLoadedUser } from '../helpers/isLoadedUser'
import { UserStatus } from '../store/navbar/types'

export const useBasicFoods = (user: UserStatus) => {
  React.useEffect(() => {
    // Fetch the basic foods after we log in, just in case
    if (
      isBrowser() &&
      localStorage.getItem(fetchBasicFoodsKey) !== 'true' &&
      isLoadedUser(user)
    ) {
      fetchAllBasicFoods()
    }
  }, [user])
}
