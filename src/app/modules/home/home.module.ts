import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FullCalendarModule,
    MaterialManageFormsModule,
  ]
})
export class HomeModule { }
