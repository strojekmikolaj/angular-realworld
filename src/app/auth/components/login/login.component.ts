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
import {LoginRequest} from '../../types/login.request'
import {BackendErrorMessagesComponent} from 'src/app/shared/components/backend-error-messages/backend-error-messages.components'

interface RegisterData {
  isSubmitting: boolean
  backendErrors: BackendErrorInterface | null
}

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    BackendErrorMessagesComponent,
  ],
})
export class LoginComponent implements OnInit {
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
    const request: LoginRequest = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.login({request}))
  }

  private configureForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
}
