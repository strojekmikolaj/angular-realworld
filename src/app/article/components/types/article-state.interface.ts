import {ArticleInterface} from 'src/app/shared/types/article.interface'

export interface ArticleState {
  isLoading: boolean
  error: string | null
  data: ArticleInterface | null
}
