import {ProfileInterface} from './profile.interface'

export interface CommentInterface {
  id: number
  createdAt: Date
  updatedAt: Date
  body: string
  author: ProfileInterface
}
