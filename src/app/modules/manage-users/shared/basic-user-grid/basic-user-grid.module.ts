import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicUserGridComponent } from './basic-user-grid.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    BasicUserGridComponent
  ],
  imports: [
    CommonModule,
    MaterialManageFormsModule,
    MatSlideToggleModule,
  ],
  exports: [
    BasicUserGridComponent,
  ]
})
export class BasicUserGridModule { }
