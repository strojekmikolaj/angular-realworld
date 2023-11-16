import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable, combineLatest} from 'rxjs'
import {PopularTagType} from '../../types/popular-tag.type'
import {ErrorMessageComponent} from '../error-messages/error-message.component'
import {LoadingComponent} from '../loading/loading.component'
import {tagsActions} from './store/actions'
import {selectError, selectIsLoading, selectTagsData} from './store/reducers'

interface TagsData {
  isLoading: boolean
  error: string | null
  tags: PopularTagType[] | null
}

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent {
  public data$!: Observable<TagsData>

  public constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      tags: this.store.select(selectTagsData),
    })

    this.store.dispatch(tagsActions.getTags())
  }
}
