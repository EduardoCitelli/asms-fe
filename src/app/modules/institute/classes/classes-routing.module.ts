import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageClassesComponent } from './manage-classes/manage-classes.component';
import { EditClassComponent } from './edit-class/edit-class.component';

const routes: Routes = [
  { path: '', component: ManageClassesComponent },
  { path: 'add', component: EditClassComponent },
  { path: 'edit/:id', component: EditClassComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
