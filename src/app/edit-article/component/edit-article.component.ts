import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Observable, combineLatest, filter, map } from 'rxjs'
import { ArticleFormComponent } from 'src/app/shared/components/article-form/component/article-form.component'
import { ArticleFormVaules } from 'src/app/shared/components/article-form/types/article-form-vaules.interface'
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component'
import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { BackendErrorInterface } from 'src/app/shared/types/backend-errors.interface'
import { editArticleActions } from '../store/actions'
import {
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../store/reducers'

interface EditArticleData {
  isSubmitting: boolean
  isLoading: boolean
  validationErrors: BackendErrorInterface | null
  initialArticleFormValues: ArticleFormVaules
}

@Component({
  selector: 'mc-edit-article',
  templateUrl: './edit-article.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, LoadingComponent],
})
export class EditArticleComponent implements OnInit {
  public initialArticleFormValues$!: Observable<ArticleFormVaules>
  public data$!: Observable<EditArticleData>

  private slug!: string

  public constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? ''

    this.initialArticleFormValues$ = this.store.pipe(
      select(selectArticle),
      filter((article): article is ArticleInterface => article !== null),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        }
      })
    )

    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      validationErrors: this.store.select(selectValidationErrors),
      isLoading: this.store.select(selectIsLoading),
      initialArticleFormValues: this.initialArticleFormValues$,
    })

    this.store.dispatch(editArticleActions.getArticle({slug: this.slug}))
  }

  public onSubmit(articleFormVaules: ArticleFormVaules): void {
    const request = {
      article: articleFormVaules,
    }
    this.store.dispatch(
      editArticleActions.editArticle({request, slug: this.slug})
    )
  }
}
