import {HttpInterceptorFn} from '@angular/common/http'
import {inject} from '@angular/core'
import {PersistanceService} from './persistance.service'

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistantService = inject(PersistanceService)
  const token = persistantService.get('accessToken')
  request = request.clone({
    setHeaders: {
      Autorization: token ? `Token ${token}` : '',
    },
  })
  return next(request)
}
