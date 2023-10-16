import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'rooms', loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule) },
  { path: 'activities', loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule) },
  { path: 'coaches', loadChildren: () => import('./coaches/coaches.module').then(m => m.CoachesModule) },
  { path: 'staff', loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule) },
  { path: 'manage', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteRoutingModule { }
