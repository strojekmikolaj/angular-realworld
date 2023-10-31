import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {UserProfileInterface} from '../types/user-profile.interface'
import {apiUserProfile} from 'src/environments/environment.development'
import {ApiParams} from 'src/environments/const/api-params.const'
import {UserProfileResponse} from '../types/user-profile-response.interface'

@Injectable({
  providedIn: 'root',
})
export class ApiUserProfileService {
  public constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    const {API_HOST_URL, USER_PROFILE} = apiUserProfile
    const url = `${API_HOST_URL}/${USER_PROFILE}`.replace(
      ApiParams.SLUG,
      slug.toString()
    )
    return this.http
      .get<UserProfileResponse>(url)
      .pipe(map((response) => response.profile))
  }
}
