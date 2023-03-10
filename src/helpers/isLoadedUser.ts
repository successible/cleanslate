import { UserStatus } from '../store/navbar/types'

export const isLoadedUser = (user: UserStatus) => user && user !== 'PENDING'
