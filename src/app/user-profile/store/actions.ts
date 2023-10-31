import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {UserProfileInterface} from '../types/user-profile.interface'

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    'Get user profile': props<{slug: string}>(),
    'Get user profile success': props<{userProfile: UserProfileInterface}>(),
    'Get user profile failure': emptyProps(),
  },
})
