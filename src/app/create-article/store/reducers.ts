import {routerNavigationAction} from '@ngrx/router-store'
import {createFeature, createReducer, on} from '@ngrx/store'
import {CreateArticleState} from '../types/create-article-state.interface'
import {createArticleActions} from './actions'

const initialState: CreateArticleState = {
  isSubmitting: false,
  validationErrors: null,
}

const createArticleFeature = createFeature({
  name: 'create article',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(createArticleActions.createArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(createArticleActions.createArticleFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      validationErrors: actions.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
})

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createArticleFeature
