import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {PopularTagType} from 'src/app/shared/types/popular-tag.type'

export const tagsActions = createActionGroup({
  source: 'tags',
  events: {
    'Get tags': emptyProps(),
    'Get tags success': props<{tags: PopularTagType[]}>(),
    'Get tags failure': emptyProps(),
  },
})
