import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBlocksComponent } from './manage-blocks/manage-blocks.component';
import { EditBlockComponent } from './edit-block/edit-block.component';

const routes: Routes = [
  { path: '', component: ManageBlocksComponent },
  { path: 'edit/:id', component: EditBlockComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocksRoutingModule { }
