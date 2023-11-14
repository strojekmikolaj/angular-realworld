import {Route} from '@angular/router'
import {ArticleComponent} from './components/article.component'
import {provideEffects} from '@ngrx/effects'
import {provideState} from '@ngrx/store'
import * as getArticleEffect from './store/effect'
import * as getCommentEffect from '../shared/components/comments/store/effect'
import {articleFeatureKey, articleReducer} from './store/reducers'
import {
  createCommentFeatureKey,
  createCommentReducer,
} from '../shared/components/comments/store/reducers'

export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(getArticleEffect, getCommentEffect),
      provideState(articleFeatureKey, articleReducer),
      provideState(createCommentFeatureKey, createCommentReducer),
    ],
  },
]
