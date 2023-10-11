import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'
import {CurrentUserInterface} from 'src/app/shared/types/current-user.interface'
import {RegisterRequest} from '../types/register.request'
import {LoginRequest} from '../types/login.request'

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequest}>(),
    'Register success': props<{currentUser: CurrentUserInterface}>(),
    'Register failure': props<{errors: BackendErrorInterface}>(),

    Login: props<{request: LoginRequest}>(),
    'Login success': props<{currentUser: CurrentUserInterface}>(),
    'Login failure': props<{errors: BackendErrorInterface}>(),

    'Get current user': emptyProps(),
    'Get current user success': props<{currentUser: CurrentUserInterface}>(),
    'Get current user failure': emptyProps(),
  },
})
