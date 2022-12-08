import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'rooms', loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule) },
  { path: 'activities', loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteRoutingModule { }
