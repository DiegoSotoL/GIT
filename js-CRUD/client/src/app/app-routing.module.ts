import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{ StaffListComponent } from './components/staff-list/staff-list.component';
import { StaffFormComponent } from './components/staff-form/staff-form.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/staff',
    pathMatch: 'full'
  },
  {
    path: 'staff',
    component: StaffListComponent
  },
  {
    path: 'staff/add',
    component: StaffFormComponent
  },
  {
    path: 'staff/edit/:id',
    component: StaffFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
