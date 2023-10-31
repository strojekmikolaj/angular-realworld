import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {addToFavoritesActions} from './actions'
import {ApiAddToFavoritesService} from '../services/api-add-to-favorites.service'

export const addToFavoritesEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoritesService = inject(ApiAddToFavoritesService)
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? addToFavoritesService.removeToFavorites(slug)
          : addToFavoritesService.addToFavorites(slug)
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesActions.addToFavoritesSuccess({article})
          }),
          catchError(() => {
            return of(addToFavoritesActions.addToFavoritesFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
