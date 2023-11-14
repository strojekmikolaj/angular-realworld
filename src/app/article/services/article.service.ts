import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, combineLatest, filter, map} from 'rxjs'
import {selectArticleData} from '../store/reducers'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {CurrentUserInterface} from 'src/app/shared/types/current-user.interface'

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public constructor(private readonly store: Store) {}

  public isAuthor(): Observable<boolean> {
    return combineLatest({
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
  }
}
