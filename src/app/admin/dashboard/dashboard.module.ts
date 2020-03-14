import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { Item2Component } from './item2/item2.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [DashboardComponent, Item2Component, DashboardViewComponent, AdminEditComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }
