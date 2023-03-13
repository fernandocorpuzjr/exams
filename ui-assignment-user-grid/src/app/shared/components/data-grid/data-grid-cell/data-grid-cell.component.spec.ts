import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridCellComponent } from './data-grid-cell.component';

describe('DataGridCellComponent', () => {
  let component: DataGridCellComponent;
  let fixture: ComponentFixture<DataGridCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DataGridCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGridCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
