import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {feedActions} from './actions'
import {catchError, map, of, switchMap} from 'rxjs'
import {ApiFeedService} from '../services/api-feed.service'
import {GetFeedResponseInterface} from '../types/get-feed-response.interface'

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(ApiFeedService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({url}) => {
        return feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({feed})
          }),
          catchError(() => {
            return of(feedActions.getFeedFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
