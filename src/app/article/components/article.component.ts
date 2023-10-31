import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {articleActions} from '../store/actions'
import {ActivatedRoute, RouterLink} from '@angular/router'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {Observable, combineLatest, filter, map} from 'rxjs'
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../store/reducers'
import {CurrentUserInterface} from 'src/app/shared/types/current-user.interface'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {LoadingComponent} from 'src/app/shared/components/loading/loading.component'
import {ErrorMessageComponent} from 'src/app/shared/components/error-messages/error-message.component'
import {TagListComponent} from 'src/app/shared/components/tag-list/tag-list.component'

interface ArticleData {
  isLoading: boolean
  error: string | null
  article: ArticleInterface | null
  isAuthor: boolean
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
  ],
})
export class ArticleComponent implements OnInit {
  public slug!: string
  public data$!: Observable<ArticleData>
  public isAuthor$!: Observable<boolean>

  public constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? ''

    this.store.dispatch(articleActions.getArticle({slug: this.slug}))

    this.isAuthor$ = combineLatest({
      article: this.store.select(selectArticleData),
      currentUser: this.store
        .select(selectCurrentUser)
        .pipe(
          filter(
            (currentUser): currentUser is CurrentUserInterface | null =>
              currentUser !== undefined
          )
        ),
    }).pipe(
      map(({article, currentUser}) => {
        if (!article || !currentUser) {
          return false
        }
        return article.author.username === currentUser.username
      })
    )

    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      article: this.store.select(selectArticleData),
      isAuthor: this.isAuthor$,
    })
  }

  public deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({slug: this.slug}))
  }
}
