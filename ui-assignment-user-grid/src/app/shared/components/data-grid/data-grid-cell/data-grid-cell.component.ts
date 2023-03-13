import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-data-grid-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-grid-cell.component.html',
  styleUrls: ['./data-grid-cell.component.scss'],
})
export class DataGridCellComponent implements OnInit {
  @Input() row!: unknown;
  @Input() key!: string;
  value!: string;

  constructor() {}

  ngOnInit(): void {
    const val = Utils.getUnknownPropertyValue(this.row, this.key);
    if (val instanceof Date) {
      this.value = this.formatDate(val as Date);
    } else {
      this.value = val as string;
    }
  }

  private formatDate(value: Date): string {
    // TODO: Format to shorter one
    return value?.toString() || '';
  }
}
