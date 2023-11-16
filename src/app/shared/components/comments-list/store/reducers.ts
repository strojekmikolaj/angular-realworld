import { createFeature, createReducer, on } from '@ngrx/store'

import { CommentsListStateInterface } from '../types/comments-list-state.interface'
import { getCommentsActions } from './actions'

const initialState: CommentsListStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

const getCommentsFeature = createFeature({
  name: 'Get comments',
  reducer: createReducer(
    initialState,
    on(getCommentsActions.getComments, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(getCommentsActions.getCommentsSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      data: actions.comments,
    })),
    on(getCommentsActions.getCommentsFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
})

export const {
  name: getCommentsFeatureKey,
  reducer: getCommentsReducer,
  selectIsLoading,
  selectError,
  selectData: selectGetCommentsData,
} = getCommentsFeature
