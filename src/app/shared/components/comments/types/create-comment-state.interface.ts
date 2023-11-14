import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'

export interface CreateCommentState {
  isSubmitting: boolean
  validationErrors: BackendErrorInterface | null
}
