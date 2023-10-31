import {CurrentUserInterface} from './current-user.interface'

export interface CurrentUserRequest {
  user: CurrentUserInterface & {password: string}
}
