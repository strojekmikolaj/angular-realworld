import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {CommentInterface} from 'src/app/shared/types/comment-request.interface'
import {CommentsListResponse} from 'src/app/shared/types/comments-list-response.interface'
import {ApiParams} from 'src/environments/const/api-params.const'
import {apiComment} from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class ApiGetCommentService {
  public constructor(private readonly http: HttpClient) {}

  public getComments(slug: string): Observable<CommentInterface[]> {
    const {API_HOST_URL, CREATE_COMMENT} = apiComment
    const url = `${API_HOST_URL}/${CREATE_COMMENT}`.replace(
      ApiParams.SLUG,
      slug
    )
    return this.http
      .get<CommentsListResponse>(url)
      .pipe(map((response) => response.comments))
  }
}
