import {routerNavigationAction} from '@ngrx/router-store'
import {createFeature, createReducer, on} from '@ngrx/store'
import {UserProfileState} from '../types/user-profile-state.interface'
import {userProfileActions} from './actions'

const initialState: UserProfileState = {
  isLoading: false,
  error: null,
  userProfile: null,
}

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.getUserProfileSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      userProfile: actions.userProfile,
    })),
    on(userProfileActions.getUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigationAction, () => initialState)
  ),
})

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectError,
  selectUserProfile: selectUserProfileData,
} = userProfileFeature
