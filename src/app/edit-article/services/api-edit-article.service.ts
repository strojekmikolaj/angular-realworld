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
export class ApiEditArticleService {
  public constructor(private readonly http: HttpClient) {}

  public editArticle(
    request: ArticleRequest,
    slug: string
  ): Observable<ArticleInterface> {
    const {API_HOST_URL, ARTICLES} = apiArticle
    const url = `${API_HOST_URL}/${ARTICLES}/${slug}`
    return this.http
      .put<ArticleResponse>(url, request)
      .pipe(map((response) => response.article))
  }
}
