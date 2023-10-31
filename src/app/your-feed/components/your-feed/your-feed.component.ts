import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {BannerComponent} from 'src/app/shared/components/banner/banner.component'
import {FeedTogglerComponent} from 'src/app/shared/components/feed-toggler/feed-toggler.component'
import {FeedComponent} from 'src/app/shared/components/feed/feed.component'
import {PopularTagsComponent} from 'src/app/shared/components/popular-tags/popular-tags.component'
import {apiFeed} from 'src/environments/environment.development'

@Component({
  selector: 'mc-your-feed',
  templateUrl: './your-feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
})
export class YourFeedComponent {
  public apiUrl = apiFeed.FEED
}
