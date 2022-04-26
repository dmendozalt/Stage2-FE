import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { EditCardComponent } from './edit-card/edit-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardListComponent,
    DashboardCardComponent,
    EditCardComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule, FormsModule],
})
export class DashboardModule {}
