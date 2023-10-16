import {PopularTagType} from './popular-tag.type'
import {ProfileInterface} from './profile.interface'

export interface ArticleInterface {
  body: string
  createdAt: Date
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: PopularTagType[]
  title: string
  updatedAt: Date
  author: ProfileInterface
}
