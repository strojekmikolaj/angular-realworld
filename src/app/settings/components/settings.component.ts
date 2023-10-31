import {CommonModule} from '@angular/common'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms'
import {Store, select} from '@ngrx/store'
import {Observable, Subscription, combineLatest, filter} from 'rxjs'
import {selectCurrentUser} from 'src/app/auth/store/reducers'
import {CurrentUserInterface} from 'src/app/shared/types/current-user.interface'
import {SettingsForm} from '../types/settings-form.interface'
import {selectIsSubmitting, selectValidationErrors} from '../store/reducers'
import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'
import {ErrorMessageComponent} from 'src/app/shared/components/error-messages/error-message.component'
import {BackendErrorMessagesComponent} from 'src/app/shared/components/backend-error-messages/backend-error-messages.components'
import {CurrentUserRequest} from 'src/app/shared/types/current-user-request.interface'
import {authActions} from 'src/app/auth/store/actions'

interface SetttingsFormData {
  isSubmitting: boolean
  backendErrors: BackendErrorInterface | null
}

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    BackendErrorMessagesComponent,
  ],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public currentUser!: CurrentUserInterface
  public form!: FormGroup<SettingsForm>
  public data$!: Observable<SetttingsFormData>

  private currentUserSubscription?: Subscription

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store
  ) {
    this.form = this.formBuilder.nonNullable.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    })
  }

  public ngOnInit(): void {
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    })

    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser
        this.initializeForm()
      })
  }

  public ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe()
  }

  public submit(): void {
    if (!this.currentUser) {
      throw new Error('Current user is not set.')
    }
    const currentUserRequest: CurrentUserRequest = {
      user: {...this.currentUser, ...this.form.getRawValue()},
    }

    this.store.dispatch(
      authActions.updateCurrentUser({currentUser: currentUserRequest})
    )
  }

  public logout(): void {
    this.store.dispatch(authActions.logout())
  }

  private initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('Current user is not set.')
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    })
  }
}
