import {CommonModule} from '@angular/common'
import {Component, Input, OnInit} from '@angular/core'
import {CommentFormComponent} from '../comment-form/components/comment-form.component'
import {CommentFormVaules} from '../comment-form/types/comment-form-vaules.interface'
import {Store} from '@ngrx/store'
import {createCommentActions} from './store/actions'
import {Observable, combineLatest} from 'rxjs'
import {selectIsSubmitting, selectValidationErrors} from './store/reducers'
import {CreateCommentState} from './types/create-comment-state.interface'

@Component({
  selector: 'mc-comments',
  templateUrl: './comments.component.html',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
})
export class CommentsComponent implements OnInit {
  @Input() public slug!: string

  public data$!: Observable<CreateCommentState>

  public constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      validationErrors: this.store.select(selectValidationErrors),
    })
  }

  public onSubmit(commentFormValues: CommentFormVaules): void {
    const request = {
      comment: commentFormValues,
    }

    this.store.dispatch(
      createCommentActions.createComment({slug: this.slug, request})
    )
  }
}
