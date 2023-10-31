import {Route} from '@angular/router'
import {CreateArticleComponent} from './component/create-article.component'
import {ApiCreateArticleService} from './services/api-create-article.service'
import {provideEffects} from '@ngrx/effects'
import * as createArticleEffect from './store/effect'
import {provideState} from '@ngrx/store'
import {createArticleFeatureKey, createArticleReducer} from './store/reducers'

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      ApiCreateArticleService,
      provideEffects(createArticleEffect),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
]
