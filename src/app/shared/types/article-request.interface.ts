import {ArticleInterface} from './article.interface'

export interface ArticleRequest {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
}
