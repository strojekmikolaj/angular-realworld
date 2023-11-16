import {CommonModule} from '@angular/common'
import {Component, Input, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {CommentInterface} from '../../types/comment-request.interface'
import {Observable, combineLatest} from 'rxjs'
import {LoadingComponent} from '../loading/loading.component'
import {ErrorMessageComponent} from '../error-messages/error-message.component'
import {
  selectError,
  selectGetCommentsData,
  selectIsLoading,
} from './store/reducers'
import {getCommentsActions} from './store/actions'
import {RouterLink} from '@angular/router'

interface CommentsData {
  isLoading: boolean
  error: string | null
  comments: CommentInterface[] | null
}

@Component({
  selector: 'mc-comments-list',
  templateUrl: './comments-list.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class CommentsListComponents implements OnInit {
  @Input() public slug!: string

  public data$!: Observable<CommentsData>

  public constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      comments: this.store.select(selectGetCommentsData),
    })

    this.store.dispatch(getCommentsActions.getComments({slug: this.slug}))
  }
}
