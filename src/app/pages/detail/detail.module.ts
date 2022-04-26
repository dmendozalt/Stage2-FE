import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponentComponent } from './detail-component/detail-component.component';

@NgModule({
  declarations: [DetailComponentComponent],
  imports: [CommonModule, DetailRoutingModule],
})
export class DetailModule {}
