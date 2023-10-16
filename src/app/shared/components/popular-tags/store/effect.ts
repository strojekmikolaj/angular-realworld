import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {PopularTagType} from 'src/app/shared/types/popular-tag.type'
import {ApiTagsService} from '../services/api-tags.service'
import {tagsActions} from './actions'

export const popularTagsEffect = createEffect(
  (actions$ = inject(Actions), tagsService = inject(ApiTagsService)) => {
    return actions$.pipe(
      ofType(tagsActions.getTags),
      switchMap(() => {
        return tagsService.getTags().pipe(
          map((tags: PopularTagType[]) => {
            return tagsActions.getTagsSuccess({tags})
          }),
          catchError(() => {
            return of(tagsActions.getTagsFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
