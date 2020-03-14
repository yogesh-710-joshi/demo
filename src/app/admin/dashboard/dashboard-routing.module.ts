import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import {AdminEditComponent} from './admin-edit/admin-edit.component';
import {Item2Component} from './item2/item2.component';

const routes: Routes = [/* { path: '',  pathMatch:'full' }, */
{path : '',component : DashboardViewComponent},
{path : 'item2', component : Item2Component },
{ path: 'edit/:id/:name/:contact_number/:email', component: AdminEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
