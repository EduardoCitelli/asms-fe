import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { ManageRoomsComponent } from './manage-rooms/manage-rooms.component';
import { EditRoomComponent } from './edit-room/edit-room.component';


@NgModule({
  declarations: [
    ManageRoomsComponent,
    EditRoomComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule
  ]
})
export class RoomsModule { }
