import {ApplicationConfig, isDevMode} from '@angular/core'
import {provideRouter} from '@angular/router'

import {appRoutes} from './app.routes'
import {provideState, provideStore} from '@ngrx/store'
import {authFeatureKey, authReducer} from './auth/store/reducers'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {provideHttpClient} from '@angular/common/http'
import * as authEffects from './auth/store/effects'
import {provideEffects} from '@ngrx/effects'
import {provideRouterStore, routerReducer} from '@ngrx/router-store'

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
    provideHttpClient(),
    provideEffects(authEffects),
    provideRouterStore(),
  ],
}
