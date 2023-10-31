import {ApplicationConfig, isDevMode} from '@angular/core'
import {provideRouter} from '@angular/router'

import {appRoutes} from './app.routes'
import {provideState, provideStore} from '@ngrx/store'
import {authFeatureKey, authReducer} from './auth/store/reducers'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import * as authEffects from './auth/store/effects'
import * as feedEffects from './shared/components/feed/store/effect'
import * as popularTagsEffect from './shared/components/popular-tags/store/effect'
import * as addToFavorites from './shared/components/add-to-favouties/store/effect'
import {provideEffects} from '@ngrx/effects'
import {provideRouterStore, routerReducer} from '@ngrx/router-store'
import {authInterceptor} from './shared/services/auth-interceptor'
import {
  feedFeatureKey,
  feedReducer,
} from './shared/components/feed/store/reducers'
import {
  tagsFeatureKey,
  tagsReducer,
} from './shared/components/popular-tags/store/reducers'
import {ApiAddToFavoritesService} from './shared/components/add-to-favouties/services/api-add-to-favorites.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(tagsFeatureKey, tagsReducer),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideEffects(authEffects, feedEffects, popularTagsEffect, addToFavorites),
    provideRouterStore(),
    ApiAddToFavoritesService,
  ],
}
