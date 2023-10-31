import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {ApiArticleService} from 'src/app/shared/services/api-article.service'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {articleActions} from './actions'
import {Router} from '@angular/router'

export const getArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ApiArticleService)) => {
    return actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({slug}) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return articleActions.getArticleSuccess({article})
          }),
          catchError(() => {
            return of(articleActions.getArticleFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const deleteArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ApiArticleService)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticle),
      switchMap(({slug}) => {
        return articleService.deleteArticle(slug).pipe(
          map(() => {
            return articleActions.deleteArticleSuccess()
          }),
          catchError(() => {
            return of(articleActions.deleteArticleFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterArticleDeleteEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticleSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  {
    functional: true,
    dispatch: false,
  }
)
