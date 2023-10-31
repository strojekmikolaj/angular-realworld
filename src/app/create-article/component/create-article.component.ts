import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, combineLatest} from 'rxjs'
import {ArticleFormComponent} from 'src/app/shared/components/article-form/component/article-form.component'
import {ArticleFormVaules} from 'src/app/shared/components/article-form/types/article-form-vaules.interface'
import {CreateArticleState} from '../types/create-article-state.interface'
import {selectIsSubmitting, selectValidationErrors} from '../store/reducers'
import {createArticleActions} from '../store/actions'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
})
export class CreateArticleComponent implements OnInit {
  public initialArticleFormValues!: ArticleFormVaules
  public data$!: Observable<CreateArticleState>

  public constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.initialArticleFormValues = {
      title: '',
      description: '',
      body: '',
      tagList: [],
    }

    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      validationErrors: this.store.select(selectValidationErrors),
    })
  }

  public onSubmit(articleFormVaules: ArticleFormVaules): void {
    const request = {
      article: articleFormVaules,
    }
    this.store.dispatch(createArticleActions.createArticle({request}))
  }
}
