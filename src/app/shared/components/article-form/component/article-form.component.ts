import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {ArticleFormVaules} from '../types/article-form-vaules.interface'
import {BackendErrorInterface} from 'src/app/shared/types/backend-errors.interface'
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {BackendErrorMessagesComponent} from '../../backend-error-messages/backend-error-messages.components'

@Component({
  selector: 'mc-article-form',
  templateUrl: './article-form.component.html',
  standalone: true,
  imports: [CommonModule, BackendErrorMessagesComponent, ReactiveFormsModule],
})
export class ArticleFormComponent implements OnInit {
  @Input() public initialValues!: ArticleFormVaules
  @Input() public isSubmitting!: boolean
  @Input() public errors!: BackendErrorInterface | null

  @Output() public articleSubmit = new EventEmitter<ArticleFormVaules>()

  public form!: FormGroup

  public constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      body: '',
      tagList: '',
    })
  }

  public ngOnInit(): void {
    this.initializeForm()
  }

  public initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided')
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    })
  }

  public onSubmit(): void {
    const formValue = this.form.getRawValue()
    const articleFormValues: ArticleFormVaules = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    }
    this.articleSubmit.emit(articleFormValues)
  }
}
