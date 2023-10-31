import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'
import {ApiAddToFavoritesService} from './services/api-add-to-favorites.service'
import {Store} from '@ngrx/store'
import {addToFavoritesActions} from './store/actions'

@Component({
  selector: 'mc-add-to-favourites',
  templateUrl: './add-to-favourites.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [ApiAddToFavoritesService],
})
export class AddToFavouritesComponent {
  @Input() public isFavorited!: boolean
  @Input() public articleSlug!: string
  @Input() public favoritesCount!: number

  public constructor(private readonly store: Store) {}

  public handleLike(): void {
    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    )
    this.setFavoritesCout()
    this.toggleIsFavorited()
  }

  private setFavoritesCout(): void {
    this.isFavorited ? this.favoritesCount-- : this.favoritesCount++
  }
  private toggleIsFavorited(): void {
    this.isFavorited = !this.isFavorited
  }
}
