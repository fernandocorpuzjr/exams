import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.scss'],
})
export class UserToolbarComponent implements OnInit, OnDestroy {
  @Input() isEditEnabled = false;
  @Input() isDeleteEnabled = false;
  @Output() onNew: EventEmitter<void> = new EventEmitter();
  @Output() onEdit: EventEmitter<void> = new EventEmitter();
  @Output() onDelete: EventEmitter<void> = new EventEmitter();
  @Output() onReload: EventEmitter<string> = new EventEmitter();
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  searchString = '';
  searchDebouncer$: Subject<string> = new Subject();
  destroyed$: Subject<void> = new Subject();

  constructor() {
    this.searchDebouncer$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      )
      .subscribe((searchStr) => {
        this.onSearch.emit(searchStr);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  handleSearchInput() {
    this.searchDebouncer$.next(this.searchString);
  }

  clearSearch() {
    this.searchString = '';
    this.handleSearchInput();
  }
}
