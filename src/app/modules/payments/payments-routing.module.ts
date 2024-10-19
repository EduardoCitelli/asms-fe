import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePaymentsComponent } from './manage-payments/manage-payments.component';

const routes: Routes = [
  { path: '', component: ManagePaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
