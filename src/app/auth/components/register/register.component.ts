import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable, combineLatest} from 'rxjs'
import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'
import {authActions} from '../../store/actions'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers'
import {AuthStateInterface} from '../../types/auth-state.interface'
import {RegisterRequest} from '../../types/register.request'
import {BackendErrorMessages} from 'src/app/shared/components/backend-error-messages/backend-error-messages.components'

interface RegisterData {
  isSubmitting: boolean
  backendErrors: BackendErrorInterface | null
}

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    BackendErrorMessages,
  ],
})
export class RegisterComponent implements OnInit {
  public form!: UntypedFormGroup
  public data$!: Observable<RegisterData>

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{auth: AuthStateInterface}>
  ) {}

  public ngOnInit(): void {
    this.configureForm()
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    })
  }

  public onSubmit(): void {
    const request: RegisterRequest = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({request}))
  }

  private configureForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
}
