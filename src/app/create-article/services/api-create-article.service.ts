import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {ArticleRequest} from 'src/app/shared/types/article-request.interface'
import {ArticleResponse} from 'src/app/shared/types/article-response.interface'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {apiArticle, apiAuth} from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class ApiCreateArticleService {
  public constructor(private readonly http: HttpClient) {}

  public createArticle(request: ArticleRequest): Observable<ArticleInterface> {
    const {API_HOST_URL, ARTICLES} = apiArticle
    const url = `${API_HOST_URL}/${ARTICLES}`
    return this.http
      .post<ArticleResponse>(url, request)
      .pipe(map((response) => response.article))
  }
}
