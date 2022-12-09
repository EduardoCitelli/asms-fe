import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'memberships', loadChildren: () => import('./memberships/memberships.module').then(m => m.MembershipsModule) },
  { path: 'membership-types', loadChildren: () => import('./membership-types/membership-types.module').then(m => m.MembershipTypesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
