import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox'

const component = [
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  FlexLayoutModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatSelectModule,
  MatCardModule,
  MatSnackBarModule,
  FormsModule,
  ReactiveFormsModule,
  MatCheckboxModule,
]


@NgModule({
  declarations: [],
  imports: [component],
  exports: [component],
})
export class MaterialManageFormsModule { }
