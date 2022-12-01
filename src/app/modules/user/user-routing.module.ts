import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const routes: Routes = [
  { path: 'manage-user', component: ManageUserComponent },
  { path: 'manage-pass', component: ManagePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
