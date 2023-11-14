import {HttpErrorResponse} from '@angular/common/http'
import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {createCommentActions} from './actions'
import {ApiCreateCommentService} from '../services/api-create-comment.service'

export const createCommentEffect = createEffect(
  (
    actions$ = inject(Actions),
    createCommentService = inject(ApiCreateCommentService)
  ) => {
    return actions$.pipe(
      ofType(createCommentActions.createComment),
      switchMap(({slug, request}) => {
        return createCommentService.createComment(slug, request).pipe(
          map((comment) => {
            return createCommentActions.createCommentSuccess({
              comment,
            })
          }),
          catchError((errorsResponse: HttpErrorResponse) => {
            return of(
              createCommentActions.createCommentFailure({
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
