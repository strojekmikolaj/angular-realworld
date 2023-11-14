import {ApiParams} from './const/api-params.const'

const {SLUG, ID} = ApiParams

export const environment = {
  limit: 20,
}
export const _commonEnvironment = {
  apiAuth: {
    API_HOST_URL: 'https://api.realworld.io/api',
    USER: 'user',
    USERS: 'users',
    LOGIN: 'users/login',
  },
  apiFeed: {
    API_HOST_URL: 'https://api.realworld.io/api',
    ARTICLES: 'articles',
    FEED: 'articles/feed',
  },
  apiTags: {
    API_HOST_URL: 'https://api.realworld.io/api',
    TAGS: 'tags',
  },
  apiArticle: {
    API_HOST_URL: 'https://api.realworld.io/api',
    ARTICLES: 'articles',
  },
  apiFavorites: {
    API_HOST_URL: 'https://api.realworld.io/api',
    FAVORITES: `articles/${SLUG}/favorite`,
  },
  apiUserProfile: {
    API_HOST_URL: 'https://api.realworld.io/api',
    USER_PROFILE: `profiles/${SLUG}`,
  },
  apiComment: {
    API_HOST_URL: 'https://api.realworld.io/api',
    GET_COMMENT: `articles/${SLUG}/comments`,
    CREATE_COMMENT: `articles/${SLUG}/comments`,
    DELETE_COMMENT: `articles/${SLUG}/comments/${ID}`,
  },
}
