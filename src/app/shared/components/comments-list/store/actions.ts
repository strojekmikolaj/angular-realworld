import {createActionGroup, props} from '@ngrx/store'
import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'
import {CommentInterface} from 'src/app/shared/types/comment-request.interface'

export const getCommentsActions = createActionGroup({
  source: 'Get comments',
  events: {
    'Get comments': props<{slug: string}>(),
    'Get comments success': props<{comments: CommentInterface[]}>(),
    'Get comments failure': props<{errors: BackendErrorInterface}>(),
  },
})
