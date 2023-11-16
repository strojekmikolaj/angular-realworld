import {CommentInterface} from 'src/app/shared/types/comment-request.interface'

export interface CommentsListStateInterface {
  isLoading: boolean
  error: string | null
  data: CommentInterface[] | null
}
