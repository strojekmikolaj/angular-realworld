import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {
  ActivatedRoute,
  Params,
  Route,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router'
import {Store, select} from '@ngrx/store'
import {userProfileActions} from '../store/actions'
import {Observable, combineLatest, filter, map} from 'rxjs'
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../store/reducers'
import {UserProfileState} from '../types/user-profile-state.interface'
import {CurrentUserInterface} from 'src/app/shared/types/current-user.interface'
import {UserProfileInterface} from '../types/user-profile.interface'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {FeedComponent} from 'src/app/shared/components/feed/feed.component'

interface UserProfileData {
  isLoading: boolean
  error: string | null
  userProfile: UserProfileInterface | null
  isCurrentUserProfile: boolean
}

@Component({
  selector: 'mc-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
})
export class UserProfileComponent implements OnInit {
  public slug!: string
  public data$!: Observable<UserProfileData>
  public isCurrentUserProfile!: Observable<boolean>

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  public ngOnInit(): void {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      userProfile: this.store.select(selectUserProfileData),
      isCurrentUserProfile: this.isCurrentUserProfile,
    })

    this.isCurrentUserProfile = combineLatest({
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

    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug']
      this.fetchUserProfile()
    })
  }

  public getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites')
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`
  }

  private fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({slug: this.slug}))
  }
}
