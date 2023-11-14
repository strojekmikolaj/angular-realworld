import {createActionGroup, props} from '@ngrx/store'
import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'
import {CommentInterface} from 'src/app/shared/types/comment-request.interface'
import {CommentRequest} from 'src/app/shared/types/comment.interface'

export const createCommentActions = createActionGroup({
  source: 'Create comment',
  events: {
    'Create comment': props<{slug: string; request: CommentRequest}>(),
    'Create comment success': props<{comment: CommentInterface}>(),
    'Create comment failure': props<{errors: BackendErrorInterface}>(),
  },
})
