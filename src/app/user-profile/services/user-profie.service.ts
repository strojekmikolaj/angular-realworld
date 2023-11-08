import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {Store, select} from '@ngrx/store'
import {Observable, combineLatest, filter, map} from 'rxjs'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {CurrentUserInterface} from 'src/app/shared/types/current-user.interface'
import {selectUserProfileData} from '../store/reducers'
import {UserProfileInterface} from '../types/user-profile.interface'

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  public constructor(
    private readonly router: Router,
    private readonly store: Store
  ) {}

  public isCurrentUserProfile(): Observable<boolean> {
    return combineLatest({
      currentUser: this.store.pipe(
        select(selectCurrentUser),
        filter((currentUser): currentUser is CurrentUserInterface =>
          Boolean(currentUser)
        )
      ),
      userProfile: this.store.pipe(
        select(selectUserProfileData),
        filter((userProfile): userProfile is UserProfileInterface =>
          Boolean(userProfile)
        )
      ),
    }).pipe(
      map(({currentUser, userProfile}) => {
        return currentUser?.username === userProfile.username
      })
    )
  }
}
