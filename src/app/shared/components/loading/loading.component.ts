import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'

@Component({
  selector: 'mc-loading',
  templateUrl: './loading.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class LoadingComponent {}
