import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {CommentInterface} from 'src/app/shared/types/comment-request.interface'
import {ApiGetCommentService} from '../services/api-get-comments.service'
import {getCommentsActions} from './actions'
import {HttpErrorResponse} from '@angular/common/http'

export const getCommentsEffect = createEffect(
  (
    actions$ = inject(Actions),
    getCommentsService = inject(ApiGetCommentService)
  ) => {
    return actions$.pipe(
      ofType(getCommentsActions.getComments),
      switchMap(({slug}) => {
        return getCommentsService.getComments(slug).pipe(
          map((comments: CommentInterface[]) => {
            return getCommentsActions.getCommentsSuccess({comments})
          }),
          catchError((errorsResponse: HttpErrorResponse) => {
            return of(
              getCommentsActions.getCommentsFailure({
                errors: errorsResponse.error.errors,
              })
            )
          })
        )
      })
    )
  },
  {functional: true}
)
