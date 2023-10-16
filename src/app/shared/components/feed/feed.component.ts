import {CommonModule} from '@angular/common'
import {Component, Input, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable, combineLatest} from 'rxjs'
import {environment} from 'src/environments/_common_environment'
import {ErrorMessageComponent} from '../error-messages/error-message.component'
import {LoadingComponent} from '../loading/loading.component'
import {PaginationComponent} from '../pagination/pagination.component'
import {FeedService} from './services/feed.service'
import {feedActions} from './store/actions'
import {selectError, selectFeedData, selectIsLoading} from './store/reducers'
import {GetFeedResponseInterface} from './types/get-feed-response.interface'
import { TagListComponent } from '../tag-list/tag-list.component'

interface FeedData {
  isLoading: boolean
  error: string | null
  feed: GetFeedResponseInterface | null
}

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent
  ],
})
export class FeedComponent implements OnInit {
  @Input() public apiUrl!: string

  public data$!: Observable<FeedData>
  public baseUrl!: string
  public currentPage!: number
  public limit!: number

  public constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly feedService: FeedService
  ) {}

  public ngOnInit(): void {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      feed: this.store.select(selectFeedData),
    })
    this.limit = environment.limit
    this.baseUrl = this.getBaseFromUrl()

    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = this.getPageForPagination(params)
      this.fetchFeed()
    })
  }

  private fetchFeed(): void {
    const url = this.feedService.createUrlWithParams(
      this.apiUrl,
      this.currentPage,
      this.limit
    )
    this.store.dispatch(feedActions.getFeed({url}))
  }

  private getBaseFromUrl(): string {
    return this.router.url.split('?')[0]
  }

  private getPageForPagination(params: Params): number {
    return Number(params['page'] || '1')
  }
}
