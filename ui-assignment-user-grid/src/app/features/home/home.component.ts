import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { Row, IHeaderColumn, SortDirection } from 'src/app/shared/components/data-grid/data-grid.interface';
import { IUser } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(DataGridComponent) grid!: DataGridComponent;
  data: Row<IUser>[] = [];
  headers: IHeaderColumn[] = [];
  destroyed$: Subject<void> = new Subject();

  isAddModalVisible = false;
  isEditModalVisible = false;
  isDeleteModalVisible = false;
  selectedIds: string[] = [];
  userToEdit!: IUser;
  searchString!: string;
  loading = false;

  constructor(
    private readonly userService: UserService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.initSource();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  initSource() {
    this.headers = [
      {
        title: 'User Id',
        key: 'userId',
        sortable: true,
        sortDirection: SortDirection.Ascending,
      },
      {
        title: 'First Name',
        key: 'firstName',
        sortable: true,
      },
      {
        title: 'Last Name',
        key: 'lastName',
        sortable: true,
      },
      {
        title: 'Email',
        key: 'email',
        sortable: true,
      },
      {
        title: 'Status',
        key: 'status',
        sortable: true,
      },
      {
        title: 'Created On',
        key: 'createdOn',
        sortable: true,
      },
    ];
    this.fetchUser();
  }

  fetchUser() {
    this.loading = true;
    this.userService
      .getUsers(this.searchString)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (users) => {
          this.data = users;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  handleSelection(selectedIndexes: number[]) {
    this.selectedIds = this.data
      .filter((u, index) => selectedIndexes.indexOf(index) > -1)
      .map((u) => u.userId);
    console.log('### selectedIds', this.selectedIds);
  }

  handleAddUser() {
    this.isAddModalVisible = true;
  }

  handleEditUser() {
    if (this.selectedIds.length !== 1) {
      return;
    }
    this.isEditModalVisible = true;
    this.userToEdit = this.data.find(
      (u) => u.userId === this.selectedIds[0]
    ) as IUser;
  }

  handleDeleteUser() {
    if (this.selectedIds.length === 0) {
      return;
    }
    this.isDeleteModalVisible = true;
  }

  proceedDelete() {
    this.spinner.show();
    this.userService
      .deleteUsers(this.selectedIds)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.fetchUser();
          this.isDeleteModalVisible = false;
          this.toaster.success('Successfully deleted User(s)');
          this.spinner.hide();
          if (this.grid) {
            this.grid.clearSelection();
            this.selectedIds = [];
          }
        },
        error: () => {
          this.toaster.error('Error while deleting user(s)');
          this.spinner.hide();
        },
      });
  }

  handleReload() {
    this.spinner.show();
    this.userService
      .refresh()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (users) => {
          this.data = users;
          this.spinner.hide();
        },
        error: () => {
          this.spinner.hide();
        },
      });
  }

  handleUserSearch(searchString: string) {
    this.searchString = searchString;
    this.fetchUser();
  }

  handleNewUserSave(user: IUser) {
    this.spinner.show();
    this.userService
      .addUser(user)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.fetchUser();
          this.isAddModalVisible = false;
          this.toaster.success('Successfully Created User');
          this.spinner.hide();
        },
        error: () => {
          this.toaster.error('Error while creating user');
          this.spinner.hide();
        },
      });
  }

  handleEditUserSave(user: IUser) {
    this.spinner.show();
    this.userService
      .editUser(user)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.fetchUser();
          this.isEditModalVisible = false;
          this.toaster.success('Successfully edited User');
          this.spinner.hide();
        },
        error: () => {
          this.toaster.error('Error while editing user');
          this.spinner.hide();
        },
      });
  }
}
