import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from './blocks-routing.module';
import { ManageBlocksComponent } from './manage-blocks/manage-blocks.component';
import { EditBlockComponent } from './edit-block/edit-block.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { FilterModule } from 'src/app/shared/filter/filter.module';


@NgModule({
  declarations: [
    ManageBlocksComponent,
    EditBlockComponent
  ],
  imports: [
    CommonModule,
    BlocksRoutingModule,
    MaterialManageFormsModule,
    NgxMatTimepickerModule,
    FilterModule,
  ]
})
export class BlocksModule { }
