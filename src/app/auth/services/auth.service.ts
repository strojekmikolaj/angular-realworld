import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {RegisterRequest} from '../types/register.request'
import {Observable, map} from 'rxjs'
import {CurrentUserInterface} from 'src/app/shared/types/current-user.interface'
import {AuthResponse} from '../types/auth-response.interface'
import {apiAuth} from 'src/environments/environment.development'
import {LoginRequest} from '../types/login.request'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public getCurrentUser(): Observable<CurrentUserInterface> {
    const {API_HOST_URL, USER} = apiAuth
    const url = `${API_HOST_URL}/${USER}`
    return this.http.get<AuthResponse>(url).pipe(map(this.getUser))
  }

  public register(data: RegisterRequest): Observable<CurrentUserInterface> {
    const {API_HOST_URL, USERS} = apiAuth
    const url = `${API_HOST_URL}/${USERS}`
    return this.http.post<AuthResponse>(url, data).pipe(map(this.getUser))
  }

  public login(data: LoginRequest): Observable<CurrentUserInterface> {
    const {API_HOST_URL, LOGIN} = apiAuth
    const url = `${API_HOST_URL}/${LOGIN}`
    return this.http.post<AuthResponse>(url, data).pipe(map(this.getUser))
  }

  private getUser(response: AuthResponse): CurrentUserInterface {
    return response.user
  }
}
