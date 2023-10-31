import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'

export interface EditArticleState {
  article: ArticleInterface | null
  isLoading: boolean
  isSubmitting: boolean
  validationErrors: BackendErrorInterface | null
}
