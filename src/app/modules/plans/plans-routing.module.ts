import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePlansComponent } from './manage-plans/manage-plans.component';
import { EditPlansComponent } from './edit-plans/edit-plans.component';

const routes: Routes = [
  { path: '', component: ManagePlansComponent },
  { path: 'add', component: EditPlansComponent },
  { path: 'edit/:id', component: EditPlansComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
