import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyInstituteComponent } from './my-institute/my-institute.component';

const routes: Routes = [
  { path: '', component: MyInstituteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
