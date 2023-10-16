import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {PopularTagType} from 'src/app/shared/types/popular-tag.type'
import {apiTags} from 'src/environments/environment.development'
import {TagsResponse} from '../../feed/types/tags-response.interface'

@Injectable({
  providedIn: 'root',
})
export class ApiTagsService {
  public constructor(private readonly http: HttpClient) {}

  public getTags(): Observable<PopularTagType[]> {
    const {API_HOST_URL, TAGS} = apiTags
    const url = `${API_HOST_URL}/${TAGS}`
    return this.http.get<TagsResponse>(url).pipe(map(this.mapResponse))
  }

  private mapResponse(response: TagsResponse): PopularTagType[] {
    return response.tags
  }
}
