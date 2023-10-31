import {CommonModule} from '@angular/common'
import {Component, Input, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {CurrentUserInterface} from '../../types/current-user.interface'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {RouterLink, RouterLinkActive} from '@angular/router'

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class FeedTogglerComponent implements OnInit {
  @Input() public tagName?: string
  public currentUser$!: Observable<CurrentUserInterface | null | undefined>

  public constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.currentUser$ = this.store.select(selectCurrentUser)
  }
}
