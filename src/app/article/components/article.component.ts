import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable, combineLatest, filter} from 'rxjs'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {ArticleMetaComponent} from 'src/app/shared/components/article-meta/article-meta.component'
import {CommentsComponent} from 'src/app/shared/components/comments/comments.component'
import {ErrorMessageComponent} from 'src/app/shared/components/error-messages/error-message.component'
import {LoadingComponent} from 'src/app/shared/components/loading/loading.component'
import {TagListComponent} from 'src/app/shared/components/tag-list/tag-list.component'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {CurrentUserInterface} from 'src/app/shared/types/current-user.interface'
import {ArticleService} from '../services/article.service'
import {articleActions} from '../store/actions'
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../store/reducers'
import {CommentsListComponents} from 'src/app/shared/components/comments-list/comments-list.component'

interface ArticleData {
  isLoading: boolean
  error: string | null
  article: ArticleInterface | null
  isAuthor: boolean
  currentUser: CurrentUserInterface | null
}

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
    ArticleMetaComponent,
    CommentsComponent,
    CommentsListComponents,
  ],
})
export class ArticleComponent implements OnInit {
  public slug!: string
  public data$!: Observable<ArticleData>
  public isAuthor$!: Observable<boolean>
  public currentUser$!: Observable<CurrentUserInterface | null>

  public constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly articleService: ArticleService
  ) {}

  public ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? ''

    this.store.dispatch(articleActions.getArticle({slug: this.slug}))

    this.isAuthor$ = this.articleService.isAuthor()

    this.currentUser$ = this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== undefined
        )
      )

    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      article: this.store.select(selectArticleData),
      isAuthor: this.isAuthor$,
      currentUser: this.currentUser$,
    })
  }

  public deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({slug: this.slug}))
  }
}
