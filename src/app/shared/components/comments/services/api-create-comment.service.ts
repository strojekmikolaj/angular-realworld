import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {CommentInterface} from 'src/app/shared/types/comment-request.interface'
import {CommentResponse} from 'src/app/shared/types/comment-response.interface'
import {CommentRequest} from 'src/app/shared/types/comment.interface'
import {ApiParams} from 'src/environments/const/api-params.const'
import {apiComment} from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class ApiCreateCommentService {
  public constructor(private readonly http: HttpClient) {}

  public createComment(
    slug: string,
    request: CommentRequest
  ): Observable<CommentInterface> {
    const {API_HOST_URL, CREATE_COMMENT} = apiComment
    const url = `${API_HOST_URL}/${CREATE_COMMENT}`.replace(
      ApiParams.SLUG,
      slug
    )
    return this.http
      .post<CommentResponse>(url, request)
      .pipe(map((response) => response.comment))
  }
}
