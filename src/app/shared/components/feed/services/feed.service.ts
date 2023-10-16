import {Injectable} from '@angular/core'
import queryString from 'query-string'

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  public createUrlWithParams(
    url: string,
    currentPage: number,
    limit: number
  ): string {
    const offset = currentPage * limit - limit
    const parsedUrl = queryString.parseUrl(url)
    const stringifiedParams = queryString.stringify({
      limit,
      offset,
      ...parsedUrl.query,
    })

    return `${parsedUrl.url}?${stringifiedParams}`
  }
}
