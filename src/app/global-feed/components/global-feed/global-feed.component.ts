import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, combineLatest} from 'rxjs'
import {BannerComponent} from 'src/app/shared/components/banner/banner.component'
import {FeedComponent} from 'src/app/shared/components/feed/feed.component'
import {PopularTagsComponent} from 'src/app/shared/components/popular-tags/popular-tags.component'
import {tagsActions} from 'src/app/shared/components/popular-tags/store/actions'
import {
  selectError,
  selectIsLoading,
  selectTagsData,
} from 'src/app/shared/components/popular-tags/store/reducers'
import {PopularTagType} from 'src/app/shared/types/popular-tag.type'
import {apiFeed} from 'src/environments/environment.development'

@Component({
  selector: 'mc-global-feed',
  templateUrl: './global-feed.component.html',
  standalone: true,
  imports: [CommonModule, FeedComponent, BannerComponent, PopularTagsComponent],
})
export class GlobalFeedComponent {
  public apiUrl = apiFeed.ARTICLES
}
