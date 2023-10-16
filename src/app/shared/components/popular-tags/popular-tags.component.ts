import {CommonModule} from '@angular/common'
import {Component, Input, OnInit} from '@angular/core'
import {PopularTagType} from '../../types/popular-tag.type'
import {Observable, combineLatest} from 'rxjs'
import {Store} from '@ngrx/store'
import {selectError, selectIsLoading, selectTagsData} from './store/reducers'
import {tagsActions} from './store/actions'
import {LoadingComponent} from '../loading/loading.component'
import {ErrorMessageComponent} from '../error-messages/error-message.component'
import {RouterLink} from '@angular/router'

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

    this.fetchTags()
  }

  private fetchTags(): void {
    this.store.dispatch(tagsActions.getTags())
  }
}
