import {routerNavigationAction} from '@ngrx/router-store'
import {createFeature, createReducer, on} from '@ngrx/store'
import {CreateCommentState} from '../types/create-comment-state.interface'
import {createCommentActions} from './actions'

const initialState: CreateCommentState = {
  isSubmitting: false,
  validationErrors: null,
}

const createCommentFeature = createFeature({
  name: 'create comment',
  reducer: createReducer(
    initialState,
    on(createCommentActions.createComment, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(createCommentActions.createCommentSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(createCommentActions.createCommentFailure, (state, actions) => ({
      ...state,
      isSubmitting: false,
      validationErrors: actions.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
})

export const {
  name: createCommentFeatureKey,
  reducer: createCommentReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createCommentFeature
