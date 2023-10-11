import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, combineLatest} from 'rxjs'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {CurrentUserInterface} from '../../types/current-user.interface'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'mc-topbar',
  templateUrl: './top-bar.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class TopbarComponent implements OnInit {
  public data$!: Observable<{
    currentUser: CurrentUserInterface | null | undefined
  }>
  public constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.data$ = combineLatest({
      currentUser: this.store.select(selectCurrentUser),
    })
  }
}
