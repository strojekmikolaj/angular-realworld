import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {ArticleRequest} from 'src/app/shared/types/article-request.interface'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'

export const editArticleActions = createActionGroup({
  source: 'edit article',
  events: {
    'Get article': props<{slug: string}>(),
    'Get article success': props<{article: ArticleInterface}>(),
    'Get article failure': emptyProps(),

    'Edit article': props<{request: ArticleRequest; slug: string}>(),
    'Edit article success': props<{article: ArticleInterface}>(),
    'Edit article failure': props<{errors: BackendErrorInterface}>(),
  },
})
