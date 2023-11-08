import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {ArticleResponse} from 'src/app/shared/types/article-response.interface'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {ApiParams} from 'src/environments/const/api-params.const'
import {apiFavorites} from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class ApiAddToFavoritesService {
  constructor(private http: HttpClient) {}

  public addToFavorites(slug: string): Observable<ArticleInterface> {
    const {API_HOST_URL, FAVORITES} = apiFavorites
    const url = `${API_HOST_URL}/${FAVORITES}`.replace(ApiParams.SLUG, slug)
    return this.http
      .post<ArticleResponse>(url, {})
      .pipe(map((response) => response.article))
  }

  public removeToFavorites(slug: string): Observable<ArticleInterface> {
    const {API_HOST_URL, FAVORITES} = apiFavorites
    const url = `${API_HOST_URL}/${FAVORITES}`.replace(ApiParams.SLUG, slug)
    return this.http
      .delete<ArticleResponse>(url)
      .pipe(map((response) => response.article))
  }
}
