import {Injectable} from '@angular/core'
import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'

@Injectable({
  providedIn: 'root',
})
export class BackendErrorService {
  public errorMessagesConverter(errors: BackendErrorInterface) {
    return Object.keys(errors).map((name: string) => {
      const messages = errors[name].join(' ')
      return `${name} ${messages}`
    })
  }
}
