import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsRoutingModule } from './rooms-routing.module';
import { ManageRoomsComponent } from './manage-rooms/manage-rooms.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';


@NgModule({
  declarations: [
    ManageRoomsComponent,
    EditRoomComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MaterialManageFormsModule,
  ]
})
export class RoomsModule { }
