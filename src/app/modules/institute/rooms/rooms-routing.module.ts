import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { ManageRoomsComponent } from './manage-rooms/manage-rooms.component';

const routes: Routes = [
  { path: '', component: ManageRoomsComponent },
  { path: 'add', component: EditRoomComponent },
  { path: 'edit/:id', component: EditRoomComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
