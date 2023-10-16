import {CommonModule} from '@angular/common'
import {Component, Input, OnInit} from '@angular/core'
import {PaginationService} from './services/pagination.service'
import {UtilsService} from '../../services/utils.service'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class PaginationComponent implements OnInit {
  @Input() total!: number
  @Input() limit!: number
  @Input() currentPage!: number
  @Input() url!: string

  public pagesCount!: number
  public pages!: number[]

  public constructor(
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService
  ) {}

  public ngOnInit(): void {
    this.pagesCount = this.paginationService.setPagesCount(
      this.total,
      this.limit
    )

    this.pages =
      this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : []
  }
}
