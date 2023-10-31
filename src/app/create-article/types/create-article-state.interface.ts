import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'

export interface CreateArticleState {
  isSubmitting: boolean
  validationErrors: BackendErrorInterface | null
}
