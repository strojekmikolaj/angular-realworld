import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable, combineLatest} from 'rxjs'
import {FeedComponent} from 'src/app/shared/components/feed/feed.component'
import {UserProfileService} from '../services/user-profie.service'
import {userProfileActions} from '../store/actions'
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../store/reducers'
import {UserProfileInterface} from '../types/user-profile.interface'
import {FollowButtonComponent} from 'src/app/shared/components/follow-button/follow-button.component'

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
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FeedComponent,
    FollowButtonComponent,
  ],
})
export class UserProfileComponent implements OnInit {
  public slug!: string
  public data$!: Observable<UserProfileData>
  public isCurrentUserProfile!: Observable<boolean>

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
    private readonly userProfileService: UserProfileService
  ) {}

  public ngOnInit(): void {
    this.isCurrentUserProfile = this.userProfileService.isCurrentUserProfile()

    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      userProfile: this.store.select(selectUserProfileData),
      isCurrentUserProfile: this.isCurrentUserProfile,
    })

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
