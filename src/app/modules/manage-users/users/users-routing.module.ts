import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGridComponent } from './user-grid/user-grid.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: '', component: UserGridComponent },
  { path: 'edit/:id', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
