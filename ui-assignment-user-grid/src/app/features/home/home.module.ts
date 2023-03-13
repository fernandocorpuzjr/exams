import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserFormComponent } from 'src/app/shared/components/user-form/user-form.component';
import { UserToolbarComponent } from 'src/app/shared/components/user-toolbar/user-toolbar.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataGridComponent,
    NgxSpinnerModule,
    UserFormComponent,
    UserToolbarComponent,
  ],
})
export class HomeModule {}
