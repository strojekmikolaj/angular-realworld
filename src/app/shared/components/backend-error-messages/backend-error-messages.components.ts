import {Component, Input, OnInit} from '@angular/core'
import {BackendErrorInterface} from '../../types/backend-errors.interface'
import {CommonModule} from '@angular/common'
import {BackendErrorService} from './services/backend-error-messages.service'

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessages implements OnInit {
  @Input() public backendErrors!: BackendErrorInterface

  public errorMessages!: string[]

  public constructor(
    private readonly backendErrorService: BackendErrorService
  ) {}

  public ngOnInit(): void {
    this.errorMessages = this.backendErrorService.errorMessagesConverter(
      this.backendErrors
    )
  }
}
