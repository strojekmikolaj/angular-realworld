import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'
import {RouterLink} from '@angular/router'
import {ArticleInterface} from '../../types/article.interface'

@Component({
  selector: 'mc-article-meta',
  templateUrl: './article-meta.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class ArticleMetaComponent {
  @Input() public article!: ArticleInterface
}
