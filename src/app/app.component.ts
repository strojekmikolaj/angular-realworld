import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {Store} from '@ngrx/store'
import {authActions} from './auth/store/actions'
import {TopbarComponent} from './shared/components/top-bar/top-bar.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser())
  }
}
