import {CommonModule} from '@angular/common'
import {Component, EventEmitter, Input, Output} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'
import {BackendErrorMessagesComponent} from '../../backend-error-messages/backend-error-messages.components'
import {CommentFormVaules} from '../types/comment-form-vaules.interface'

@Component({
  selector: 'mc-comment-form',
  templateUrl: './comment-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesComponent],
})
export class CommentFormComponent {
  @Input() public isSubmitting!: boolean
  @Input() public errors!: BackendErrorInterface | null

  @Output() public commentSubmit = new EventEmitter<CommentFormVaules>()

  public form!: FormGroup

  public constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      body: this.formBuilder.control('', Validators.required),
    })
  }

  public onSubmit(): void {
    const formValue: CommentFormVaules = this.form.getRawValue()

    this.commentSubmit.emit(formValue)
    this.form.reset()
  }
}
