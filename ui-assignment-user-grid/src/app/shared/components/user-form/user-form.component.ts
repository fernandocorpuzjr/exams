import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser, UserStatus } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() model!: IUser;
  @Output() onSave: EventEmitter<IUser> = new EventEmitter();
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  form!: FormGroup;
  userStatusRef = UserStatus;

  get userId(): FormControl {
    return this.form?.get('userId') as FormControl;
  }

  get firstName(): FormControl {
    return this.form?.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.form?.get('lastName') as FormControl;
  }

  get email(): FormControl {
    return this.form?.get('email') as FormControl;
  }

  get status(): FormControl {
    return this.form?.get('status') as FormControl;
  }

  constructor() {}

  ngOnInit(): void {
    this.initForm(this.model);
  }

  initForm(userData?: IUser) {
    this.form = new FormGroup({
      userId: new FormControl<string>(userData?.userId || '', [
        Validators.required,
      ]),
      firstName: new FormControl<string>(userData?.firstName || '', [
        Validators.required,
      ]),
      lastName: new FormControl<string>(userData?.lastName || '', [
        Validators.required,
      ]),
      email: new FormControl<string>(userData?.email || '', [
        Validators.required,
        Validators.email,
      ]),
      status: new FormControl<UserStatus>(
        userData?.status || UserStatus.Initiated,
        [Validators.required]
      ),
      createdOn: new FormControl<Date | null>(userData?.createdOn || null),
    });
  }

  handleSave() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.onSave.emit({
      ...this.form.value,
      createdOn: this.form.value.createdOn ?? new Date(),
    } as IUser);
  }
}
