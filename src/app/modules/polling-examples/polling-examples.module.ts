import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { PollingExamplesContainerComponent } from './components/polling-examples-container/polling-examples-container.component';
import { SingleDataConsumerComponent } from './components/single-data-consumer/single-data-consumer.component';
import { SingleDataConsumersContainerComponent } from './components/single-data-consumers-container/single-data-consumers-container.component';


@NgModule({
  declarations: [
    PollingExamplesContainerComponent,
    SingleDataConsumerComponent,
    SingleDataConsumersContainerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PollingExamplesContainerComponent
  ]
})
export class PollingExamplesModule { }
