import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IDataSource,
  IHeaderColumn,
  Row,
  SortDirection,
} from './data-grid.interface';
import { DataGridCellComponent } from './data-grid-cell/data-grid-cell.component';
import { FormsModule } from '@angular/forms';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule, DataGridCellComponent, FormsModule],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit {
  @Input() headers: IHeaderColumn[] = [];
  @Input() data: Row<unknown>[] = [];
  @Input() searchString!: string;
  @Output() onSelectionChange: EventEmitter<number[]> = new EventEmitter();

  isAllSelected = false;
  sortDirectionRef = SortDirection;

  constructor() {}

  ngOnInit(): void {
    this.updateAllSelectionState();
    // Do initial sorting
    const sortingReference = this.headers.find(
      (h) => h.sortable && h.sortDirection
    );
    if (sortingReference) {
      this.performSort(sortingReference);
    }
  }

  toggleSort(header: IHeaderColumn) {
    if (!header.sortable) {
      return;
    }
    // Clear other column sort flag
    this.headers
      .filter((h) => h.key !== header.key)
      .forEach((h) => {
        h.sortDirection = undefined;
      });

    // Toggle sort direction
    if (header.sortDirection === SortDirection.Ascending) {
      header.sortDirection = SortDirection.Descending;
    } else {
      header.sortDirection = SortDirection.Ascending;
    }

    this.performSort(header);
  }

  toggleAllSelection() {
    this.data.forEach((row) => {
      row.selected = this.isAllSelected;
    });
    this.emitSelections();
  }

  handleSelection() {
    this.updateAllSelectionState();
    this.emitSelections();
  }

  private updateAllSelectionState() {
    this.isAllSelected = !this.data?.find((r) => !r.selected);
  }

  private emitSelections() {
    const selectedIndexes: number[] = [];
    this.data.forEach((row, index) => {
      if (row.selected) {
        selectedIndexes.push(index);
      }
    });
    this.onSelectionChange.emit(selectedIndexes);
  }

  private performSort(headerSortReference: IHeaderColumn) {
    this.data.sort((rowA, rowB) => {
      const propA = Utils.getUnknownPropertyValue(
        rowA,
        headerSortReference.key
      ) as string;
      const propB = Utils.getUnknownPropertyValue(
        rowB,
        headerSortReference.key
      ) as string;

      return headerSortReference.sortDirection === SortDirection.Ascending
        ? propA > propB
          ? 1
          : -1
        : propB > propA
        ? 1
        : -1;
    });
  }

  public clearSelection() {
    this.data.forEach((row) => {
      row.selected = false;
    });
    this.isAllSelected = false;
  }
}
