import {Route} from '@angular/router'
import {ArticleComponent} from './components/article.component'
import {provideEffects} from '@ngrx/effects'
import {provideState} from '@ngrx/store'
import * as getArticleEffect from './store/effect'
import * as createCommentEffect from '../shared/components/comments/store/effect'
import * as getCommentEffect from '../shared/components/comments-list/store/effect'
import {articleFeatureKey, articleReducer} from './store/reducers'
import {
  createCommentFeatureKey,
  createCommentReducer,
} from '../shared/components/comments/store/reducers'
import {
  getCommentsFeatureKey,
  getCommentsReducer,
} from '../shared/components/comments-list/store/reducers'

export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(getArticleEffect, createCommentEffect, getCommentEffect),
      provideState(articleFeatureKey, articleReducer),
      provideState(createCommentFeatureKey, createCommentReducer),
      provideState(getCommentsFeatureKey, getCommentsReducer),
    ],
  },
]
