import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {ArticleRequest} from 'src/app/shared/types/article-request.interface'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'

export const createArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Create article': props<{request: ArticleRequest}>(),
    'Create article success': props<{article: ArticleInterface}>(),
    'Create article failure': props<{errors: BackendErrorInterface}>(),
  },
})
