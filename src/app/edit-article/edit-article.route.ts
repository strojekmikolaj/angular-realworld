import {Route} from '@angular/router'
import {provideEffects} from '@ngrx/effects'
import {provideState} from '@ngrx/store'
import {EditArticleComponent} from './component/edit-article.component'
import {ApiEditArticleService} from './services/api-edit-article.service'
import {editArticleFeatureKey, editArticleReducer} from './store/reducers'
import * as editArticleEffect from './store/effect'

export const routes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      ApiEditArticleService,
      provideEffects(editArticleEffect),
      provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
]
