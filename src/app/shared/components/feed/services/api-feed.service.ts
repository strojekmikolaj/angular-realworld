import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {GetFeedResponseInterface} from '../types/get-feed-response.interface'
import {Observable} from 'rxjs'
import {apiAuth} from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class ApiFeedService {
  public constructor(private readonly http: HttpClient) {}

  public getFeed(url: string): Observable<GetFeedResponseInterface> {
    const {API_HOST_URL} = apiAuth
    const fullUrl = `${API_HOST_URL}/${url}`
    return this.http.get<GetFeedResponseInterface>(fullUrl)
  }
}
