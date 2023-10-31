import {UserProfileInterface} from './user-profile.interface'

export interface UserProfileState {
  userProfile: UserProfileInterface | null
  isLoading: boolean
  error: string | null
}
